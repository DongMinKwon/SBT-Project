// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT
import './AdminPageHeader.scss';

export default function AdminPageHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-page-header">
      <div className="admin-page-header__container">{children}</div>
    </div>
  );
}
