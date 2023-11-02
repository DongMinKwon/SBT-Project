// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT
import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { ChainService } from '../chain/chain.service';

@Module({
  imports: [],
  controllers: [StoreController],
  providers: [StoreService, ChainService],
})
export class StoreModule {}
