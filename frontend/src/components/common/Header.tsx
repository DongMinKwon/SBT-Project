// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT
import './Header.scss';

import { Link } from 'react-router-dom';
import { connect } from '@/utils/web3auth';

export default function Header() {
  return (
    <nav className="header">
      <div className="header__logo">
        <Link to="/" className="header__h1">
          DID You Eat?
        </Link>
      </div>
      <div className="header__button">
        <button type="button" className="header__login" onClick={connect}>
          login
        </button>
      </div>
    </nav>
  );
}
