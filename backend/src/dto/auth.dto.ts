// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

export class LoginMetaData {
  signature: string;
  payload: string;
  address: string;
}

export interface jwtPayload {
  address: string;
}
