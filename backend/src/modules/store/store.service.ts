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

  async getStore(storeId: string, res: Response): Promise<Response> {
    let store;
    try {
      store = await prisma.store.findUnique({
        where: {
          shop_name: storeId,
        },
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ store });
  }

  async createStores(data: CreateStoreDTO, res: Response): Promise<Response> {
    const { metaURI, metaData, receiver } = data;

    const { name, image } = metaData;
    const { coord, location } = metaData.attributes;

    try {
      const result = await this.chainService.createStore(
        name,
        receiver,
        metaURI,
      );

      if (result) {
        const store = await prisma.store.create({
          data: {
            shop_name: name,
            meta_uri: metaURI,
            image_uri: image,
            coord: coord,
            location: location,
            owner_id: receiver,
          },
        });

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
