// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { prisma } from 'prisma/prisma';
import { CreateStoreDTO } from 'src/dto/store.dto';
import { ChainService } from '../chain/chain.service';

@Injectable()
export class StoreService {
  constructor(private readonly chainService: ChainService) {}

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

  async createStores(data: CreateStoreDTO, res: Response): Promise<Response> {
    const { metaURI, metaData, receiver } = data;

    const { name } = metaData;
    const { coord, location } = metaData.attributes;

    try {
      const result = await this.chainService.createStore(
        name,
        receiver,
        metaURI,
      );

      console.log(receiver);

      if (result) {
        const store = await prisma.store.create({
          data: {
            shop_name: name,
            meta_uri: metaURI,
            coord: coord,
            location: location,
            owner_id: receiver,
          },
        });

        console.log(store);

        return res.status(200).json({ status: 'success', store });
      }

      return res
        .status(500)
        .json({ status: 'fail', error: 'Failed to create store' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ status: 'fail', error: err.message });
    }
  }
}
