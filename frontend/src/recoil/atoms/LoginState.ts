// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import { atom } from 'recoil';
import { LoginState } from './StateTypes';

const type = atom({
  key: 'type',
  default: 'metamask',
});

const account = atom({
  key: 'account',
  default: '',
});

const accessToken = atom({
  key: 'token',
  default: '',
});

const loginState: LoginState = {
  type,
  account,
  accessToken,
};

export default loginState;
