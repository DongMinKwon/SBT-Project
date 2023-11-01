// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { prisma } from 'prisma/prisma';

@Injectable()
export class StoreService {
  async getStores(address: string, res: Response): Promise<Response> {
    let storeList;
    try {
      storeList = await prisma.store.findMany({
        where: {
          owner: {
            address: address,
          },
        },
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ storeList });
  }
}
