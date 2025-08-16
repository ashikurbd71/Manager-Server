import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {

    console.log(req.user);

    return await this.authService.login(req.user);
  }

  @Get('profile')
  // @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    console.log(req.user);
    return { user: req.user };
  }
}
