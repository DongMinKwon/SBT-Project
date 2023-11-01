// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import { useState } from 'react';
import { Link } from 'react-router-dom';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import './CreateStore.scss';

export default function CreateStore() {
  const [image, setImage] = useState({
    image_file: '',
    preview_URL: '',
  });
  const [store, setStore] = useState({
    name: '',
    address: '',
    detail_address: '',
  });

  return (
    <div className="create-store">
      {/* {isLoading && <LoadingModal />} */}
      <AdminPageHeader>Store SBT</AdminPageHeader>
      <div className="create-store__body">
        <h1>Create Store SBT</h1>
        <p>
          You can use every service with just One Store SBT.
          <br />
          Do You Already Have Store SBT?
          <Link to="/admin/store">
            <span> Store List ↘</span>
          </Link>
        </p>
      </div>

      <div className="create-store__fieldset-container">
        <fieldset className="create-store__fieldset">
          {/* <h5 className="create-store-date">
            Created At : {month[date.getMonth()]} {date.getDate()},{' '}
            {date.getFullYear()}
          </h5> */}
        </fieldset>
        <fieldset className="create-store__fieldset">
          {/* <h5>매장이름</h5> */}
          <div className="input-area">
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
              <input
                // ref={storeNameRef}
                // onChange={handleStoreNameInput}
                type="text"
                id="store_name"
              />
              Store Name
            </label>
          </div>
        </fieldset>

        <fieldset className="create-store__fieldset">
          {/* <h5>매장주소</h5> */}
          <div className="input-area">
            <label
              htmlFor="store_address"
              className={
                store.address === ''
                  ? 'label-placeholder'
                  : 'label-placeholder is-written'
              }
            >
              <input
                id="address-input"
                // onChange={handleStoreAddressInput}
                // value={store.address}
                type="text"
              />
              Store Address
            </label>
          </div>
        </fieldset>

        {/* <fieldset
          className={
            store.address === ''
              ? 'create-store__fieldset hide'
              : 'create-store__fieldset'
          }
        >
          {/* <h5>매장 상세주소</h5> */}
        {/* <div className="input-area">
            <label
              onClick={() => {
                storeDetailAddressRef.current.focus();
              }}
              htmlFor="input"
              className={
                store.detail_address === ''
                  ? 'label-placeholder'
                  : 'label-placeholder is-written'
              }
            >
              Detail Address
              <input
                ref={storeDetailAddressRef}
                type="text"
                onChange={handleStoreDetailInput}
              />
            </label>
          </div> */}
        {/* </fieldset>  */}

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
                  // onChange={handleImgInputChange}
                  // onClick={(e) => (e.target.value = null)}
                  id="img_file"
                />
              </label>
            </div>
            {!!image.preview_URL && (
              <img
                src={image.preview_URL}
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
            // onClick={handleCreate}
            className="classic-button yellow-color  margin-auto"
          >
            Create
          </div>
        </fieldset>
      </div>
    </div>
  );
}
