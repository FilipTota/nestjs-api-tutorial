import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @desc    Register user
  // @route   POST /auth/register
  @Post('register')
  register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  // @desc    Login user
  // @route   POST /auth/login
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}
