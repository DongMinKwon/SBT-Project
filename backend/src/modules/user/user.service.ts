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
}
