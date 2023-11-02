// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT
import { Injectable } from '@nestjs/common';
import { MintTokenDTO } from 'src/dto/token.dto';
// import { prisma } from 'prisma/prisma';
import { Response } from 'express';
import { ChainService } from '../chain/chain.service';
import { prisma } from 'prisma/prisma';
import { convertDate } from 'src/utils/date';

@Injectable()
export class TokenService {
  constructor(private readonly chainService: ChainService) {}

  async mintToken(data: MintTokenDTO, res: Response): Promise<Response> {
    const { receiver, storeName } = data;
    let token = null;

    try {
      const result = await this.chainService.mintToken(receiver, storeName);

      if (result) {
        const { createdAt } = result;
        token = await prisma.token.create({
          data: {
            created_at: convertDate(createdAt),
            store_id: storeName,
            user_id: receiver,
          },
        });
      }

      return res.status(200).json({ status: 'success', token });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        status: 'fail',
        error: err.message,
      });
    }
  }

  async getToken(tokenId: number, res: Response): Promise<Response> {
    try {
      const token = await prisma.token.findUnique({
        where: {
          id: tokenId,
        },
        include: {
          store: true,
        },
      });

      return res.status(200).json({ status: 'success', token });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        status: 'fail',
        error: err.message,
      });
    }
  }
}
