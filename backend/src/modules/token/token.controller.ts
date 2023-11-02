// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { TokenService } from './token.service';
import { Response } from 'express';
import { MintTokenDTO } from 'src/dto/token.dto';

@Controller('tokens')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  createStores(
    @Body() data: MintTokenDTO,
    @Res() res: Response,
  ): Promise<Response> {
    return this.tokenService.mintToken(data, res);
  }

  @Get(':tokenId')
  getStore(
    @Res() res: Response,
    @Param('tokenId') tokenId: string,
  ): Promise<Response> {
    return this.tokenService.getToken(+tokenId, res);
  }
}
