import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { LoginMetaData } from 'src/dto/auth.dto';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/nonce')
  getNonce(): { nonce: string } {
    const nonce = randomBytes(32).toString('hex');
    return { nonce };
  }

  @Post('/login')
  login(@Body() data: LoginMetaData, @Res() res: Response) {
    return this.authService.loginMeta(data, res);
  }
}
