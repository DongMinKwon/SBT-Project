// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import { prisma } from '../prisma';

async function aggregate_test() {
  const res = await prisma.token.findMany({
    distinct: ['store_id'],
    include: {
      store: true,
    },
  });

  console.log(res);
}

aggregate_test();
