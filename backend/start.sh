# Copyright (C) 2023 Intel Corporation
# SPDX-License-Identifier: MIT

#!/bin/bash

npx prisma migrate dev --name init

yarn run start:dev