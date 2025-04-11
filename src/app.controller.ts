import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  HttpStatus,
  Body,
  HttpCode,
} from '@nestjs/common';
import { AuthService, BasicAuthGuard } from './auth';
import { AppRequest } from './shared';
import { LoginPayload, RegisterPayload } from './users/type';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get(['', 'ping'])
  healthCheck() {
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('api/auth/register')
  async register(@Body() body: RegisterPayload) {
    return await this.authService.register(body);
  }

  @HttpCode(200)
  @Post('api/auth/login')
  async login(@Body() body: LoginPayload) {
    return await this.authService.login(body, 'basic');
  }

  @UseGuards(BasicAuthGuard)
  @Get('api/profile')
  async getProfile(@Request() req: AppRequest) {
    return {
      user: req.user,
    };
  }
}
