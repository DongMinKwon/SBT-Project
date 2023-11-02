// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
// import AdminCollection from '@/src/components/AdminCollection';
import loginState from '@/recoil/atoms/LoginState';
// import AdminLayout from '@/components/admin/AdminLayout';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import './Stores.scss';

export default function Stores() {
  const [storeData, setStoreData] = useState([]);
  const accessToken = useRecoilValue(loginState.accessToken);
  const account = useRecoilValue(loginState.account);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) navigate('/login');
    axios
      .get(`/stores/${account}`)
      .then((e) => {
        if (e.data) setStoreData(e.data);
      })
      .catch((err) => {
        console.warn(`failed to Load data..`, err);
      });
  }, []);

  console.log(storeData);
  return (
    <>
      <AdminPageHeader>My Store</AdminPageHeader>
      <h2 className="semi-title">List</h2>
      <div className="admin-store__collection-list">
        {/* {storeData.map((store) => (
          <Link key={store.id} to={`/admin/store/${store.shop_name}`}>
            <AdminCollection imgUrl={store.collection_uri} />
          </Link>
        ))} */}
        <Link to="/admin/create-store">
          <div className="admin-store__create-collection">
            <span>Create New Store Collection!</span>
          </div>
        </Link>
      </div>
    </>
  );
}
