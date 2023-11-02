// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import { Controller, Get, Param, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':address/stores')
  getStores(
    @Param('address') address: string,
    @Res() res: Response,
  ): Promise<Response> {
    return this.userService.getUserStores(address, res);
  }
}
