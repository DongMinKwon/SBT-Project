// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
