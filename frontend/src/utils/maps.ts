// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import React from 'react';
import { Store } from '@/pages/CreateStore';

export const mapOptions: naver.maps.MapOptions = {
  mapTypeControl: true,
  mapTypeControlOptions: {
    mapTypeIds: null,
    style: naver.maps.MapTypeControlStyle.BUTTON,
    position: naver.maps.Position.TOP_RIGHT,
  },
};

function hasArea(area: any) {
  return !!(area && area.name && area.name !== '');
}

function hasData(data: any) {
  return !!(data && data !== '');
}

function checkLastString(word: string, lastString: string) {
  return new RegExp(`${lastString}$`).test(word);
}

function hasAddition(addition: any) {
  return !!(addition && addition.value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function makeAddress(item: any): string | null {
  if (!item) {
    return null;
  }

  const { name } = item;
  const { region } = item;
  const { land } = item;
  const isRoadAddress = name === 'roadaddr';

  let sido = '';
  let sigugun = '';
  let dongmyun = '';
  let ri = '';
  let rest = '';

  if (hasArea(region.area1)) {
    sido = region.area1.name;
  }

  if (hasArea(region.area2)) {
    sigugun = region.area2.name;
  }

  if (hasArea(region.area3)) {
    dongmyun = region.area3.name;
  }

  if (hasArea(region.area4)) {
    ri = region.area4.name;
  }

  if (land) {
    if (hasData(land.number1)) {
      if (hasData(land.type) && land.type === '2') {
        rest += '산';
      }

      rest += land.number1;

      if (hasData(land.number2)) {
        rest += `-${land.number2}`;
      }
    }

    if (isRoadAddress === true) {
      if (checkLastString(dongmyun, '면')) {
        ri = land.name;
      } else {
        dongmyun = land.name;
        ri = '';
      }

      if (hasAddition(land.addition0)) {
        rest += ` ${land.addition0.value}`;
      }
    }
  }

  return [sido, sigugun, dongmyun, ri, rest].join(' ');
}

export function searchCoordinateToAddress(
  map: naver.maps.Map,
  infoWindow: naver.maps.InfoWindow,
  marker: naver.maps.Marker,
  coord: naver.maps.Coord,
  setStore: React.Dispatch<React.SetStateAction<Store>>,
) {
  naver.maps.Service.reverseGeocode(
    {
      coords: coord,
      orders: [
        naver.maps.Service.OrderType.ADDR,
        naver.maps.Service.OrderType.ROAD_ADDR,
      ].join(','),
    },
    (
      status: naver.maps.Service.Status,
      response: naver.maps.Service.ReverseGeocodeResponse,
    ) => {
      if (status === naver.maps.Service.Status.ERROR) {
        throw new Error('Something went wrong!');
      }

      const items = response.v2.results;
      let address = '';
      const htmlAddresses: string[] = [];
      let roadAddr = '';
      let jibunAddr = '';

      for (let i = 0, ii = items.length, item, addrType; i < ii; i += 1) {
        item = items[i];
        address = makeAddress(item) || '';
        addrType = item.name === 'roadaddr' ? '[도로명 주소]' : '[지번 주소]';
        if (item.name === 'roadaddr') {
          roadAddr = address;
        } else {
          jibunAddr = address;
        }

        htmlAddresses.push(`${i + 1}. ${addrType} ${address}`);
      }

      marker.setPosition(coord);
      marker.setVisible(true);

      infoWindow.setContent(
        [
          '<div style="padding:10px;min-width:200px;line-height:150%;">',
          '<h5 style="margin-top:5px; color:black">선택 좌표</h4><br />',
          `<span style="color:black">${htmlAddresses.join('<br />')}</span>`,
          '</div>',
        ].join('\n'),
      );
      infoWindow.open(map, marker);

      setStore((prev) => ({
        ...prev,
        address: roadAddr || jibunAddr,
      }));
    },
  );
}

export function searchAddressToCoordinate(
  map: naver.maps.Map,
  infoWindow: naver.maps.InfoWindow,
  marker: naver.maps.Marker,
  address: any,
  setStore: React.Dispatch<React.SetStateAction<Store>>,
) {
  naver.maps.Service.geocode(
    {
      query: address,
    },
    (status, response) => {
      try {
        if (status === naver.maps.Service.Status.ERROR) {
          throw new Error('Something went wrong!');
        }

        if (response.v2.meta.totalCount === 0) {
          throw new Error('totalCount is 0');
        }

        const htmlAddresses = [];
        const item = response.v2.addresses[0];
        const point = new naver.maps.Point(+item.x, +item.y);

        if (item.roadAddress) {
          htmlAddresses.push(`[도로명 주소] ${item.roadAddress}`);
        }

        if (item.jibunAddress) {
          htmlAddresses.push(`[지번 주소] ${item.jibunAddress}`);
        }

        if (item.englishAddress) {
          htmlAddresses.push(`[영문명 주소] ${item.englishAddress}`);
        }

        infoWindow.setContent(
          [
            '<div style="padding:10px;min-width:200px;line-height:150%;">',
            '<h5 style="margin-top:5px; color:black">선택 좌표</h4><br />',
            `<span style="color:black">${htmlAddresses.join('<br />')}</span>`,
            '</div>',
          ].join('\n'),
        );

        marker.setPosition(point);
        marker.setVisible(true);

        map.setCenter(point);
        infoWindow.open(map, marker);

        setStore((prev) => ({
          ...prev,
          address: item.roadAddress,
        }));
      } catch (err) {
        infoWindow.close();
        marker.setVisible(false);
        setStore((prev) => ({
          ...prev,
          address: '',
        }));
        console.warn(err);
      }
    },
  );
}
