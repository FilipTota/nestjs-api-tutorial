import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async register(dto: AuthDto) {
    // generate pass
    const hashPassword = await argon.hash(dto.password);

    try {
      // save user in db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashPassword,
        },
        // select is used to return selected values to user variable
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });

      // return saved user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async login(dto: AuthDto) {
    // find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Wrong credentials');
    }

    // compare password
    const machedPassword = await argon.verify(user.password, dto.password);
    if (!machedPassword) {
      throw new ForbiddenException('Wrong credentials');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    // return user
    return userWithoutPassword;
  }
}
