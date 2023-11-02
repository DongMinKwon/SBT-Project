// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { jwtPayload } from 'src/dto/auth.dto';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: jwtPayload): Promise<any> {
    const { address } = payload;
    const user = await this.userService.findUser(address);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
