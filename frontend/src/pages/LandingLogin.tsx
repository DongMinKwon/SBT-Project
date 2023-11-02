// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import './LandingLogin.scss';
import { useEffect } from 'react';
import { connectWeb3, useConnectMeta } from '@/utils/walletConnect';
import Loading from '@/components/common/Loading';

export default function LandingLogin() {
  const [params, setParams] = useSearchParams();
  const isMint = params.get('mint');
  const storeName = params.get('store_name');

  const navigate = useNavigate();
  const [connect, account, accessToken, isMinting] = useConnectMeta(
    isMint,
    storeName,
  );

  const web3LoginHandler = async () => {
    const result = await connectWeb3();
    if (result) {
      navigate(-1);
    }
  };

  return (
    <div className="qr-mint">
      {isMinting ? (
        <div className="boomloading">
          <Loading />
        </div>
      ) : (
        <>
          <div className="qr-mint__header">
            <Link to="/" className="header__h1">
              Food GO
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

                <button
                  onClick={connect}
                  type="button"
                  className="login-button"
                >
                  <img alt="google" src="/images/googleLogo.png" />
                  <span className="login-button__word">
                    Login with Metamask
                  </span>
                </button>
              </div>
              <p className="qr-mint__footer">
                If you already have Metamask, you can connect here.
                <br />
                If you don&apos;t, you can log in with your Google account.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
