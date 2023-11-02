// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT
import axios from 'axios';
import { Image, CreateStoreData } from '@/pages/CreateStore';

export interface Metadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    coord: string;
    location: string;
  };
}

export const sendFileToIPFS = async (
  image: Image,
  store: CreateStoreData,
  coordX: number,
  coordY: number,
) => {
  if (image.imageFile) {
    try {
      const formData = new FormData();
      formData.append('file', image.imageFile);

      const resImage = await axios({
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        data: formData,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_PINATA_KEY}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const ImgHash = `https://aqua-worried-lark-594.mypinata.cloud/ipfs/${resImage.data.IpfsHash}`;

      const metaData: Metadata = {
        name: store.name,
        description: 'description',
        image: ImgHash,
        attributes: {
          coord: JSON.stringify({ x: coordX, y: coordY }),
          location: store.address,
        },
      };

      const resMeta = await axios({
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        data: metaData,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_PINATA_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      const metaURI = `https://gateway.pinata.cloud/ipfs/${resMeta.data.IpfsHash}`;

      return { metaURI, metaData };
    } catch (error) {
      console.log('Error sending File to IPFS: ');
      console.log(error);
    }
  }

  return null;
};

export const pinataTest = async () => {
  try {
    const res = await axios.get(
      'https://api.pinata.cloud/data/testAuthentication',
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_PINATA_KEY}`,
        },
      },
    );

    console.log(res);
  } catch (err) {
    console.log('Error sending File to IPFS: ');
    console.log(err);
  }
};
