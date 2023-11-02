// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

export class CreateStoreDTO {
  metaURI: string;
  metaData: Metadata;
  receiver: string;
}

export interface Metadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    coord: string;
    location: string;
  };
}
