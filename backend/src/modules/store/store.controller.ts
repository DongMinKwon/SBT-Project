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
import { CreateStoreDTO } from 'src/dto/store.dto';

@Controller('stores')
@UseGuards(JwtAuthGuard)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get(':id')
  getStore(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    return this.storeService.getStore(+id, res);
  }

  @Post()
  createStores(
    @Body() data: CreateStoreDTO,
    @Res() res: Response,
  ): Promise<Response> {
    return this.storeService.createStores(data, res);
  }
}
