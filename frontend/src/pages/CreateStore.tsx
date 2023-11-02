// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import './CreateStore.scss';
import {
  mapOptions,
  searchAddressToCoordinate,
  searchCoordinateToAddress,
} from '@/utils/maps';
import { Metadata, sendFileToIPFS } from '@/utils/ipfs';
import LoadingModal from '@/components/common/LoadingModal';
import loginState from '@/recoil/atoms/LoginState';
import { createStore } from '@/apis/store';

export interface Image {
  imageFile: string;
  previewURL: string;
}
export interface CreateStoreData {
  name: string;
  address: string;
}

export default function CreateStore() {
  const [isLoading, setIsLoading] = useState(false);
  const account = useRecoilValue(loginState.account);
  const [image, setImage] = useState({
    imageFile: '',
    previewURL: '',
  });
  const [store, setStore] = useState<CreateStoreData>({
    name: '',
    address: '',
  });
  const navigate = useNavigate();
  const map = useRef<null | naver.maps.Map>(null);
  const marker = useRef<null | naver.maps.Marker>(null);
  const infoWindow = useRef<null | naver.maps.InfoWindow>(null);

  useEffect(() => {
    // pinataTest();
    const mapDiv = document.getElementById('create-store__map') as HTMLElement;
    map.current = new naver.maps.Map(mapDiv, mapOptions);
    marker.current = new naver.maps.Marker({
      position: map.current.getCenter(),
      map: map.current as naver.maps.Map,
    });

    marker.current.setVisible(false);

    infoWindow.current = new naver.maps.InfoWindow({
      anchorSkew: true,
      content: '',
    });

    const clickListener = map.current.addListener(
      'click',
      (e: naver.maps.PointerEvent) => {
        searchCoordinateToAddress(
          map.current as naver.maps.Map,
          infoWindow.current as naver.maps.InfoWindow,
          marker.current as naver.maps.Marker,
          e.coord,
          setStore,
        );
      },
    );

    return () => {
      map.current?.removeListener(clickListener);
    };
  }, []);

  const handleStoreNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStore((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleStoreAddressInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStore((prev) => ({
      ...prev,
      address: e.target.value,
    }));
  };

  const handleImgInputChange = (e: any) => {
    const newImageFile = e.target.files[0];
    const formData = new FormData();

    formData.append('newImageFile', newImageFile);

    if (newImageFile) {
      // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
      URL.revokeObjectURL(image.previewURL);
      const previewURL = URL.createObjectURL(newImageFile);
      setImage({
        imageFile: newImageFile,
        previewURL,
      });
    }
  };

  const handleAddressKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchAddressToCoordinate(
        map.current as naver.maps.Map,
        infoWindow.current as naver.maps.InfoWindow,
        marker.current as naver.maps.Marker,
        e.currentTarget.value,
        setStore,
      );
    }
  };

  const handleCreate = async () => {
    if (!store.name) {
      alert('please enter the store name!');
      return;
    }
    if (!store.address) {
      alert('please enter the store address!');
      return;
    }
    if (!image.imageFile) {
      alert('please upload store image');
      return;
    }
    setIsLoading(true);

    try {
      const position = marker.current?.getPosition();
      const res = await sendFileToIPFS(
        image,
        store,
        position?.x as number,
        position?.y as number,
      );

      const resCreate = await createStore(
        res?.metaURI as string,
        res?.metaData as Metadata,
        account,
      );

      if (resCreate.status === 'fail') {
        alert('failed to create store');
        throw new Error('failed to create store');
      }
      setIsLoading(false);

      navigate('/admin/stores');
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="create-store">
      {isLoading && <LoadingModal />}
      <AdminPageHeader>Store SBT</AdminPageHeader>
      <div className="create-store__body">
        <div className="create-store__fieldset-container">
          <div className="create-store__title">
            <h1>Create Store SBT</h1>
            <p>
              You can use every service with just One Store SBT.
              <br />
              Do You Already Have Store SBT? &nbsp;
              <Link to="/admin/stores">
                <span className="create-store__link"> Go to Store List ↘</span>
              </Link>
            </p>
          </div>
          <fieldset className="create-store__fieldset">
            <div className="input-area">
              <input
                // ref={storeNameRef}
                onChange={handleStoreNameInput}
                value={store.name}
                type="text"
                id="store_name"
              />
              <label
                // onClick={() => {
                //   storeNameRef.current.focus();
                // }}
                htmlFor="store_name"
                className={
                  store.name === ''
                    ? 'label-placeholder'
                    : 'label-placeholder is-written'
                }
              >
                Store Name
              </label>
            </div>
          </fieldset>

          <fieldset className="create-store__fieldset">
            <div className="input-area">
              <input
                id="address-input"
                onChange={handleStoreAddressInput}
                onKeyPress={handleAddressKeypress}
                value={store.address}
                type="text"
              />
              <label
                htmlFor="store_address"
                className={
                  store.address === ''
                    ? 'label-placeholder'
                    : 'label-placeholder is-written'
                }
              >
                Search Address
              </label>
            </div>
          </fieldset>

          <div id="create-store__map" />

          <fieldset className="create-store__fieldset">
            <h5>SBT Image</h5>
            <div className="create-store__img_input">
              <div className="linear-background">
                <label htmlFor="img_file">
                  <h5>Upload Store SBT</h5>
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    fill="#f7f9f9"
                    width="45px"
                  >
                    <g>
                      <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z" />
                    </g>
                  </svg>
                  <input
                    type="file"
                    accept="image/*"
                    name="post_img"
                    className="createpost__img-input"
                    onChange={handleImgInputChange}
                    // onClick={(e) => (e.target.value = null)}
                    id="img_file"
                  />
                </label>
              </div>
              {!!image.previewURL && (
                <img
                  src={image.previewURL}
                  alt="miler"
                  width={250}
                  height={250}
                />
              )}
            </div>
            <div className="img-requirement">
              <h6>Image requirement</h6>
              <ul>
                <li>png, gif Only</li>
                <li>
                  Recommended: measures 500x500px, round shape, size less than
                  200KB (Max. 4MB)
                </li>
              </ul>
            </div>
          </fieldset>
          <fieldset className="create-store__fieldset">
            <div
              role="presentation"
              onClick={handleCreate}
              className="classic-button yellow-color  margin-auto"
            >
              Create
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
}
