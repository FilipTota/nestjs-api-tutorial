import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @desc    Register user
  // @route   POST /auth/register
  @Post('register')
  register() {
    return this.authService.register();
  }

  // @desc    Login user
  // @route   POST /auth/login
  @Post('login')
  login() {
    return this.authService.login();
  }
}
