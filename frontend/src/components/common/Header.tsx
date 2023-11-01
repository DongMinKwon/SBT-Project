// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT
import './Header.scss';

import { Link } from 'react-router-dom';
import useLogout from '@/utils/useLogout';

export default function Header() {
  const [accessToken, logout] = useLogout();

  return (
    <nav className="header">
      <div className="header__logo">
        <Link to="/" className="header__h1">
          DID You Eat?
        </Link>
      </div>
      <div className="header__button">
        {accessToken ? (
          <button type="button" onClick={logout} className="header__login">
            logout
          </button>
        ) : (
          <Link to="/login">
            <button type="button" className="header__login">
              login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
