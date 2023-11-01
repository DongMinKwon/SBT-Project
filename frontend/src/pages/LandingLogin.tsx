// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import { Link, useNavigate } from 'react-router-dom';
import './LandingLogin.scss';
import { useEffect } from 'react';
import { connectWeb3, useConnectMeta } from '@/utils/walletConnect';

export default function LandingLogin() {
  const [connect, account, accessToken] = useConnectMeta();
  const navigate = useNavigate();

  const web3LoginHandler = async () => {
    const result = await connectWeb3();
    if (result) {
      navigate(-1);
    }
  };

  useEffect(() => {
    if (accessToken) {
      navigate(-1);
    }
  }, [accessToken]);

  return (
    <div className="qr-mint">
      <div className="qr-mint__header">
        <Link to="/" className="header__h1">
          DID You Eat?
        </Link>
      </div>
      <div className="qr-mint__container">
        <div className="qr-mint__body">
          <img
            alt="lying-man"
            className="lying-man"
            src="/images/lying_man.png"
          />
          <div className="qr-mint__login-box">
            <button
              onClick={web3LoginHandler}
              type="button"
              className="login-button"
            >
              <img alt="google" src="/images/googleLogo.png" />
              <span className="login-button__word">Login with Google</span>
            </button>

            <div className="line">
              <div className="line__or">OR</div>
            </div>

            <button onClick={connect} type="button" className="login-button">
              <img alt="google" src="/images/googleLogo.png" />
              <span className="login-button__word">Login with Metamask</span>
            </button>

            {/* <ConnectWalletButton /> */}
          </div>
          <p className="qr-mint__footer">
            If you already have Petra, you can connect here.
            <br />
            If you don&apos;t, you can log in with your Google account.
            <br />
            You can later send your tokens to your Petra wallet.
          </p>
        </div>
      </div>
    </div>
  );
}
