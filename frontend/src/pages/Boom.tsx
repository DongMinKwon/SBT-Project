// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT
import ConfettiExplosion from 'react-confetti-explosion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import './Boom.scss';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { getToken } from '@/apis/token';
import Loading from '@/components/common/Loading';
import loginState from '@/recoil/atoms/LoginState';

import { Store } from './Stores';

interface Token {
  id: number;
  created_at: string;
  store: Store;
}

export default function Boom() {
  const [tokenData, setTokenData] = useState<Token | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useRecoilValue(loginState.accessToken);
  const navigate = useNavigate();

  const [params, setParams] = useSearchParams();
  const id = params.get('token_id');
  const tokenId = id ? +id : null;

  useEffect(() => {
    async function getTokenData() {
      const { status, token } = await getToken(tokenId as number);
      if (status === 'success') {
        setTokenData(token);
        setIsLoading(false);
      }
    }

    if (!accessToken) {
      navigate('/login');
      // alert("Please Login!");
    }

    if (!tokenData) {
      setIsLoading(true);
      getTokenData();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="boom">
      {isLoading ? (
        <div className="boomloading">
          <Loading />
        </div>
      ) : (
        <div className="boom__info">
          <ConfettiExplosion />
          <h1>{tokenData?.store.shop_name}</h1>
          <img
            className="boom__circle"
            src={tokenData?.store.image_uri}
            alt="no token uri"
            width={250}
            height={250}
          />

          <p>{tokenData?.store.location}</p>
          <Link to="/users">
            <button type="button" className="boom__close">
              go to collection
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
