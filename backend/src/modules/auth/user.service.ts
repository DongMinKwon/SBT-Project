import { Injectable } from '@nestjs/common';
import { prisma } from 'prisma/prisma';

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
}
