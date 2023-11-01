// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import { RecoilState } from 'recoil';

export interface TestState {
  count: RecoilState<number>;
}

export interface LoginState {
  type: RecoilState<string>;
  account: RecoilState<string>;
  accessToken: RecoilState<string>;
}
