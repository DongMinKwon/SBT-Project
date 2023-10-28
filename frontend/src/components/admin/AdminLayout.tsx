// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT
import { Outlet } from 'react-router-dom';

import AdminHeader from '@/components/common/AdminHeader';
import AdminFooter from '@/components/common/AdminFooter';

import './AdminLayout.scss';

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminHeader />
      <div className="admin-main">
        <div className="admin-main__container">
          <Outlet />
        </div>
      </div>
      <AdminFooter />
    </div>
  );
}
