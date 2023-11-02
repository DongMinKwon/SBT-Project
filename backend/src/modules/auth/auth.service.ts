// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { LoginMetaData } from 'src/dto/auth.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async loginMeta(data: LoginMetaData, res: Response) {
    const { signature, payload, address } = data;
    const client_address = ethers.utils.verifyMessage(payload, signature);

    if (address !== client_address) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await this.userService.findUser(address);

    if (!user) {
      await this.userService.createUser(address);
    }

    const accessToken = this.jwtService.sign({ address });
    return res.status(200).json({ accessToken });
  }
}
