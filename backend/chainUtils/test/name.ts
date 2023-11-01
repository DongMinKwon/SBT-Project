// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import { sbtContract } from '../scripts/setting';

async function getName() {
  const name = await sbtContract.methods.name().call();
  console.log(name);
}

getName();
