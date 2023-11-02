// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

export const createCurDate = () => {
  const curDate = new Date();

  return `${curDate.getFullYear()}/${
    curDate.getMonth() + 1
  }/${curDate.getDate()}_${curDate.getHours()}:${curDate.getMinutes()}`;
};

export const convertDate = (solDate: string) => {
  const curDate = new Date(+solDate * 1000);

  return `${curDate.getFullYear()}/${
    curDate.getMonth() + 1
  }/${curDate.getDate()}_${curDate.getHours()}:${curDate.getMinutes()}`;
};
