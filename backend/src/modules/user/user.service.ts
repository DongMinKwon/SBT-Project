import { Injectable } from '@nestjs/common';
import { prisma } from 'prisma/prisma';
import { Response } from 'express';

@Injectable()
export class UserService {
  async findUser(address: string) {
    const user = await prisma.user.findUnique({
      where: {
        address: address,
      },
    });

    return user;
  }

  async createUser(address: string) {
    const user = await prisma.user.create({
      data: {
        address: address,
      },
    });

    return user;
  }

  async getUserStores(address: string, res: Response): Promise<Response> {
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

  async getUserTokens(address: string, res: Response): Promise<Response> {
    let tokenList;
    try {
      tokenList = await prisma.token.findMany({
        distinct: ['store_id'],
        include: {
          store: true,
        },
        where: {
          user_id: address,
        },
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ tokenList });
  }
}
