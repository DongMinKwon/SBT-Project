// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import { Link } from 'react-router-dom';
import './AdminHeader.scss';
import useLogout from '@/utils/useLogout';

export default function AdminHeader() {
  const [accessToken, logout] = useLogout();

  console.log(accessToken);

  return (
    <nav className="admin-header">
      <div className="admin-header__container">
        <Link to="/admin">
          <div className="admin-header__home-button">Did You Eat?</div>
        </Link>
        {accessToken ? (
          <div
            onClick={logout}
            className="admin-header__login"
            role="presentation"
          >
            logout
          </div>
        ) : (
          <Link to="/login">
            <div className="admin-header__login">login</div>
          </Link>
        )}
      </div>
    </nav>
  );
}
