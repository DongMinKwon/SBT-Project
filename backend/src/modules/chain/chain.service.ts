// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import { Injectable } from '@nestjs/common';
import Caver, { AbiItem } from 'caver-js';
import { testNet } from './networkInfo';
import { sbtAbi } from './abi/sbtAbi';

const { SERVER_ADDR = '', SERVER_PRIVATE_KEY = '', SBT_CA = '' } = process.env;

// const caver = new Caver('https://api.baobab.klaytn.net:8651');
// const caver = new Caver('wss://public-node-api.klaytnapi.com/v1/baobab/ws');
const caver = new Caver(testNet.https);

async function generateKeyring() {
  const keyring = caver.wallet.keyring.createWithSingleKey(
    SERVER_ADDR,
    SERVER_PRIVATE_KEY,
  );

  return keyring;
}

let sbtContract = null;

async function setKeyring() {
  const keyring = await generateKeyring();
  caver.wallet.add(keyring);
  sbtContract = caver.contract.create(sbtAbi as AbiItem[], SBT_CA);
}

setKeyring();

@Injectable()
export class ChainService {
  async createStore(storeName: string, owner: string, metaURI: string) {
    if (!sbtContract) {
      await setKeyring();
    }
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
}
