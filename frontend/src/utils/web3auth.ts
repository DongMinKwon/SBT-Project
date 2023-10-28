// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import { Web3Auth } from '@web3auth/modal';

export const web3auth = new Web3Auth({
  clientId:
    'BLt4YFxxxj-FrHnPSfFnzLbp7r1uIM2-ZyHFblc33508MJl9mbOVseCw6jLwBp-9SHdq-yH7EW1NMkODjGsp1A8', // Get your Client ID from the Web3Auth Dashboard
  web3AuthNetwork: 'sapphire_devnet', // Web3Auth Network
  chainConfig: {
    chainNamespace: 'eip155',
    chainId: '0x2019',
    rpcTarget: 'https://public-en-cypress.klaytn.net',
    displayName: 'Klaytn Mainnet',
    blockExplorer: 'https://scope.klaytn.com',
    ticker: 'KLAY',
    tickerName: 'KLAY',
  },
});

export const connect = async () => {
  try {
    console.log('test');
    const res = await web3auth.initModal();
    console.log(res);
    const accounts = await web3auth.connect();
    console.log(accounts);
    const userInfo = await web3auth.authenticateUser();
    console.log(userInfo);
  } catch (err) {
    console.warn(`failed to connect..`, err);
  }
};
