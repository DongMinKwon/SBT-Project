// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import { Web3Auth } from '@web3auth/modal';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import loginState from '@/recoil/atoms/LoginState';
import { getNonce, metaLogin } from '@/apis/auth';
import { mintToken } from '@/apis/token';

export const connectWeb3 = async (): Promise<boolean> => {
  const web3auth = new Web3Auth({
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

  try {
    console.log('test');
    const res = await web3auth.initModal();
    console.log(res);
    const accounts = await web3auth.connect();
    console.log(accounts);
    const userInfo = await web3auth.authenticateUser();
    console.log(userInfo);
    return true;
  } catch (err) {
    console.warn(`failed to connect..`, err);
    return false;
  }
};

export const useConnectMeta = (
  isMint: string | null,
  storeName: string | null,
): [() => Promise<void>, string, string, boolean] => {
  const [isMeta, setIsMeta] = useState(false);
  const [account, setAccount] = useRecoilState<string>(loginState.account);
  const [accessToken, setAccessToken] = useRecoilState(loginState.accessToken);
  const [isMinting, setIsMinting] = useState(false);
  const navigate = useNavigate();

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      window.location.href =
        'https://metamask.app.link/dapp/ff94-114-200-143-209.ngrok-free.app';
      throw new Error('MetaMask is not installed!');
    }

    setIsMeta(true);

    try {
      const nonce = await getNonce();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const payload = JSON.stringify({ nonce });
      const signature = await signer.signMessage(payload);

      const data = { signature, payload, address };

      const { accessToken: token } = await metaLogin(data);
      setAccount(address);
      setAccessToken(token);
    } catch (err) {
      console.warn(`failed to sign message..`, err);
    }
  }, []);

  useEffect(() => {
    async function mint() {
      try {
        const res = await mintToken(account, storeName as string);
        const { token } = res;

        setIsMinting(false);
        setIsMeta(false);
        if (res) {
          navigate(`/boom?token_id=${token?.id}`);
        }
      } catch (err) {
        console.log(err);
        setIsMinting(false);
        setIsMeta(false);
      }
    }

    if (!isMeta) return;

    if (account && accessToken) {
      if (isMint === 'true') {
        console.log('start mint');
        setIsMinting(true);
        mint();
      } else {
        setIsMeta(false);
        navigate(-1);
      }
    }
  }, [account, accessToken]);

  return [connect, account, accessToken, isMinting];
};
