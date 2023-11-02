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
import AdminCollection from '@/components/admin/AdminCollection';
import { getUserStores } from '@/apis/store';

export interface Store {
  id: number;
  shop_name: string;
  meta_uri: string;
  image_uri: string;
  coord: string;
  location: string;
  owner_id: string;
}

export default function Stores() {
  const [storeData, setStoreData] = useState([]);
  const accessToken = useRecoilValue(loginState.accessToken);
  const account = useRecoilValue(loginState.account);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const res = await getUserStores(account);
      const { storeList } = res;
      setStoreData(storeList);
    }

    if (!accessToken || !account) navigate('/login');
    try {
      fetchData();
    } catch (err) {
      console.warn(err);
    }
  }, [account, accessToken]);

  return (
    <>
      <AdminPageHeader>My Store</AdminPageHeader>
      <h2 className="semi-title">List</h2>
      <div className="admin-store__collection-list">
        {storeData.map((store: Store) => (
          <Link key={store.id} to={`/admin/stores/${store.id}`}>
            <AdminCollection imgUrl={store.image_uri} />
          </Link>
        ))}
        <Link to="/admin/create-store">
          <div className="admin-store__create-collection">
            <span>Create New Store Collection!</span>
          </div>
        </Link>
      </div>
    </>
  );
}
