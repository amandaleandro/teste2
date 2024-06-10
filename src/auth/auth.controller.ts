import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt/jwt.guard';
import { RoleGuard } from './role/role.guard';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async login(@Body() body: any) {
    return {
      token: await this.authService.login(body.username, body.password),
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard, RoleGuard)
  @Get('about')
  getProfile(@Request() req) {
    return req.user;
  }
}
