import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
// import { Request } from 'express';
import { GetUser } from '../auth/decorator/getUser.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';

@UseGuards(JwtGuard) // @UseGuard above controller to apply it to every endpoint
@Controller('users')
export class UserController {
  // @desc    Get users
  // @route   GET /users
  @Get('me')
  getUser(@GetUser() user: User) {
    return user;
  }
  //   @UseGuards(JwtGuard)
  //   @Get('me')
  //   getUser(@Req() req: Request) {
  //     return req.user;
  //   }
}
