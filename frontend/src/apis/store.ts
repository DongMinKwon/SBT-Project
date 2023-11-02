// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import axios from 'axios';
import { Metadata } from '@/utils/ipfs';

export async function getUserStores(address: string): Promise<any> {
  let res = null;

  try {
    res = await axios.get(`/users/${address}/stores`);

    return res?.data;
  } catch (err) {
    throw new Error('Failed to get Stores');
  }
}

export async function getStore(storeId: string): Promise<any> {
  let res = null;

  try {
    res = await axios.get(`/stores/${storeId}`);

    return res?.data;
  } catch (err) {
    throw new Error('Failed to get Store');
  }
}

export async function createStore(
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
