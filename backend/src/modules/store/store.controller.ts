// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('stores')
@UseGuards(JwtAuthGuard)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get(':address')
  getStores(
    @Param('address') address: string,
    @Res() res: Response,
  ): Promise<Response> {
    return this.storeService.getStores(address, res);
  }

  @Post()
  createStores(@Body() data, @Res() res: Response): Promise<Response> {
    return this.storeService.createStores(data, res);
  }
}
