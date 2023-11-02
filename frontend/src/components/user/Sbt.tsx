// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import { Link } from 'react-router-dom';
import './Sbt.scss';

export default function SBT(props: { id: number; imgUrl: string }) {
  const { id, imgUrl } = props;
  return (
    <Link to={`/tokens/detail/${id}`}>
      <div className="token__col1">
        <img alt="SBT" src={imgUrl} width={70} height={70} />
      </div>
    </Link>
  );
}
