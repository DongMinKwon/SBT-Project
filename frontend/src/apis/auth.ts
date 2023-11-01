// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import axios from 'axios';

async function getNonce(): Promise<{ nonce: string }> {
  let res = null;

  try {
    res = await axios.get('/auth/nonce');
  } catch (err) {
    throw new Error('Failed to get nonce');
  }

  return res?.data.nonce;
}

interface LoginMetaData {
  signature: string;
  payload: string;
  address: string;
}

async function metaLogin(
  data: LoginMetaData,
): Promise<{ accessToken: string }> {
  let res = null;

  try {
    res = await axios.post('/auth/login', JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    axios.defaults.headers.common.Authorization = `Bearer ${res?.data.accessToken}`;
  } catch (err) {
    throw new Error('Failed to login');
  }

  return res?.data;
}

export { getNonce, metaLogin };
