// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import { useRecoilState } from 'recoil';
import loginState from '@/recoil/atoms/LoginState';

const useToken = (): [string, () => void] => {
  const [accessToken, setAccessToken] = useRecoilState(loginState.accessToken);

  const logout = () => {
    setAccessToken('');
  };

  return [accessToken, logout];
};

export default useToken;
