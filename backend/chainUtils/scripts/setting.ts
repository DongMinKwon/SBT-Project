// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT
import Caver, { AbiItem } from 'caver-js';
import { sbtAbi } from '../abi/sbtAbi';
import path from 'path';
import dotenv from 'dotenv';
import { testNet } from '../networkInfo';

const ROOT_DIR = path.join(__dirname, '../..');
dotenv.config({ path: `${ROOT_DIR}/.env` });

//env path setting
const { SERVER_ADDR = '', SERVER_PRIVATE_KEY = '', SBT_CA = '' } = process.env;

// const caver = new Caver('https://api.baobab.klaytn.net:8651');
// const caver = new Caver('wss://public-node-api.klaytnapi.com/v1/baobab/ws');
const caver = new Caver(testNet.websocket);

async function generateKeyring() {
  const keyring = caver.wallet.keyring.createWithSingleKey(
    SERVER_ADDR,
    SERVER_PRIVATE_KEY,
  );

  return keyring;
}

async function setKeyring() {
  const keyring = await generateKeyring();
  caver.wallet.add(keyring);
}

setKeyring();

console.log('Setting complete');

const sbtContract = caver.contract.create(sbtAbi as AbiItem[], SBT_CA);

export { caver, sbtContract };
