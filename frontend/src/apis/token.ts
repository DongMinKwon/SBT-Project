// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import axios from 'axios';

export async function mintToken(
  receiver: string,
  storeName: string,
): Promise<any> {
  let res = null;

  const data = {
    receiver,
    storeName,
  };
  try {
    res = await axios.post('/tokens', JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res?.data;
  } catch (err) {
    throw new Error('Failed to mint Token');
  }
}

export async function getToken(tokenId: number): Promise<any> {
  let res = null;

  try {
    res = await axios.get(`/tokens/${tokenId}`);

    return res?.data;
  } catch (err) {
    throw new Error('Failed to mint Token');
  }
}
