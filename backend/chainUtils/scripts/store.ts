// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import { sbtContract } from './setting';

async function createStore(storeName: string, owner: string, metaURI: string) {
  try {
    const result = await sbtContract.methods
      .createCollection(storeName, owner, metaURI)
      .send({ from: process.env.SERVER_ADDR, gas: 1000000 });

    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export { createStore };
