import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import loginState from '@/recoil/atoms/LoginState';
import Header from '@/components/common/Header';
import SBT from '@/components/user/Sbt';

import './Tokens.scss';

export default function Collection() {
  const account = useRecoilValue(loginState.account);
  const accessToken = useRecoilValue(loginState.accessToken);
  const [tokenList, setTokenList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
      // alert("Please Login!");
    }
  }, []);

  // useEffect(() => {
  //   if (connected) {
  //     axios
  //       .get(`${process.env.SERVER_URL}/tokens/${account?.address}`)
  //       .then((res) => res.data)
  //       .then((res) => {
  //         console.log(res);
  //         if (res.status === 'success') {
  //           setTokenList(res.message.token_lists);
  //           console.log(res.message);
  //         }
  //       });
  //   }
  // }, [connected]);

  // useEffect(() => {
  //   if (clientEmail) {
  //     axios
  //       .get(`${process.env.SERVER_URL}/tokens/email/${clientEmail}`)
  //       .then((res) => res.data)
  //       .then((res) => {
  //         console.log(res);
  //         if (res.status === 'success') {
  //           setTokenList(res.message.token_lists);
  //           console.log(res.message);
  //         }
  //       });
  //   }
  // }, [clientEmail]);

  return (
    <div className="token">
      <Header />
      <div className="landing__main">
        <h1 className="token__h1">My Collection</h1>
        <div className="token__row">
          {/* {tokenList
            ? tokenList.map((token) => {
                return <SBT key={token.id} id={token.id} imgUrl={token.uri} />;
              })
            : "You don't have a token yet."} */}
        </div>
      </div>
    </div>
  );
}
