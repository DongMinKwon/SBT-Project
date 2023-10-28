// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import { Link } from 'react-router-dom';
import './AdminHeader.scss';

export default function AdminHeader() {
  return (
    <nav className="admin-header">
      <div className="admin-header__container">
        <Link to="/admin">
          <div className="admin-header__home-button">Did You Eat?</div>
        </Link>
        <div className="admin-header__connect-button">
          <span>Disconnect wallet</span>
        </div>
      </div>
    </nav>
  );
}
