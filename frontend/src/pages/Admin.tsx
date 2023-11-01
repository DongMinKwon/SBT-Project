// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT
import { useRecoilState } from 'recoil';
import './Admin.scss';
import './Stars.scss';
import { useNavigate } from 'react-router-dom';
import loginState from '@/recoil/atoms/LoginState';

function Admin() {
  const [accessToken, setAccessToken] = useRecoilState(loginState.accessToken);
  const navigate = useNavigate();

  const startClick = () => {
    if (!accessToken) {
      navigate('/login');
    } else {
      navigate('/admin/stores');
    }
  };
  return (
    <div className="admin">
      <div id="stars" />
      <div id="stars2" />
      <div id="stars3" />
      <div className="admin-heading">
        <div className="admin-heading__container">
          <h1 className="admin-heading__h1">
            Introducing the new <br /> SBT and DID information offering system.
          </h1>
          <div className="admin-button__container">
            <div
              className="admin-button"
              onClick={startClick}
              role="presentation"
            >
              Start using &quot;Did You Eat&quot; system
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
