import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import loginState from '@/recoil/atoms/LoginState';
import Header from '@/components/common/Header';
import SBT from '@/components/user/Sbt';

import './Tokens.scss';
import { getUserTokens } from '@/apis/token';
import { Token } from './Boom';

export default function Collection() {
  const account = useRecoilValue(loginState.account);
  const accessToken = useRecoilValue(loginState.accessToken);
  const [tokenData, setTokenData] = useState<Token[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const res = await getUserTokens(account);
      const { tokenList } = res;
      setTokenData(tokenList);
    }

    if (!accessToken || !account) navigate('/login');
    try {
      fetchData();
    } catch (err) {
      console.warn(err);
    }
  }, [account, accessToken]);

  return (
    <div className="token">
      <Header />
      <div className="landing__main">
        <h1 className="token__h1">My Collection</h1>
        <div className="token__row">
          {tokenData
            ? tokenData.map((token) => {
                return (
                  <SBT
                    key={token.id}
                    id={token.id}
                    imgUrl={token.store.image_uri}
                  />
                );
              })
            : "You don't have a token yet."}
        </div>
      </div>
    </div>
  );
}
