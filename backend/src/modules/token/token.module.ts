// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT
import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { ChainService } from '../chain/chain.service';

@Module({
  imports: [],
  controllers: [TokenController],
  providers: [TokenService, ChainService],
})
export class TokenModule {}
