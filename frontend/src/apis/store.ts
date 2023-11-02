// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import axios from 'axios';
import { Metadata } from '@/utils/ipfs';

export default async function createStore(
  metaURI: string,
  metaData: Metadata,
  account: string,
): Promise<any> {
  let res = null;

  const data = {
    metaURI,
    metaData,
    receiver: account,
  };
  try {
    res = await axios.post('/stores', JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res?.data;
  } catch (err) {
    throw new Error('Failed to create Store');
  }
}
