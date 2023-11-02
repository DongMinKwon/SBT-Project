// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import './AdminCollection.scss';

export default function AdminCollection(props: { imgUrl: string }) {
  const { imgUrl } = props;
  return (
    <div className="admin-collection">
      <img alt="" src={imgUrl} />
    </div>
  );
}
