// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import loginState from '@/recoil/atoms/LoginState';
import './StoreDetail.scss';
import { getStore } from '@/apis/store';
import { Store } from './Stores';

function StoreDetail() {
  const match = useMatch('/admin/stores/:id');
  const id: number | null = match?.params.id ? +match.params.id : null;
  const accessToken = useRecoilValue(loginState.accessToken);
  const account = useRecoilValue(loginState.account);
  const navigate = useNavigate();

  const [storeData, setStoreData] = useState<Store>({} as Store);
  const [toggleImageQr, setToggleImageQr] = useState(false);
  const [toggleDetail, setToggleDetail] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await getStore(id as number);
      const { store } = res;
      setStoreData(store);
    }

    if (!accessToken || !account) {
      navigate('/login');
      return;
    }

    try {
      fetchData();
    } catch (err) {
      console.warn(err);
    }
  }, [id, account, accessToken]);

  return (
    <div className="store-detail">
      <AdminPageHeader>Store Detail</AdminPageHeader>
      <div className="store-detail__container">
        <div className="store-detail__title">
          {/* <h1>{tokenData.shop_name}</h1> */}
          <h1>{storeData.shop_name}</h1>
          <p>
            shop name Store SBT Detail
            <br />
            {/* Store NFT를 가지고 계십니까?{" "} */}
            <Link to="/admin/stores">
              <span> Stores↘</span>
            </Link>
          </p>
        </div>
        <div
          role="presentation"
          onClick={() => {
            setToggleImageQr(!toggleImageQr);
          }}
          className={
            toggleImageQr
              ? 'store-detail__image-qr bigger'
              : 'store-detail__image-qr'
          }
        >
          <img
            className="store-detail__img"
            src={storeData.image_uri}
            alt="please check imageURL"
          />
          {/* <Image className="qrexample" src="/images/didyoueatqr.png" alt="qrexample" width={230} height={230}></Image> */}
          <QRCodeSVG
            value={`${process.env.CLIENT_URL}/boomlogin?admin_address=${account}&store_name=${id}`}
            size={230}
            bgColor="#000000"
            fgColor="#daff5b"
            level="L"
            includeMargin={false}
          />
        </div>
        <div className="store-detail__description">
          <p>Store Name: {storeData.shop_name}</p>
          <p>Created At: just now</p>
          <p>Store Address: {storeData.location}</p>
        </div>
        <div className="store-detail__description__detail">
          <h2
            role="presentation"
            onClick={() => {
              setToggleDetail(!toggleDetail);
            }}
          >
            More Detail
            <div
              className={toggleDetail ? 'plus-button rotate-x' : 'plus-button'}
            />
          </h2>
          <p className={toggleDetail ? 'show ' : 'hide'}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            harum rerum cum suscipit doloribus repudiandae voluptate magnam,
            quod dolores blanditiis ad voluptatem velit sed accusantium culpa,
            quibusdam voluptates alias maiores animi, illum impedit veritatis
            eveniet amet recusandae! Expedita, harum itaque nobis numquam optio
            unde sint, quos a recusandae alias maxime quia atque repellat rerum
            laborum quis ipsum doloremque aliquid velit? Praesentium voluptas
            perferendis nisi vero. Corporis excepturi asperiores odio! Eum
            possimus magni id tempore iusto temporibus facilis magnam! Explicabo
            culpa nemo modi, fugiat labore minima sequi, ipsum, eum aspernatur
            rerum sit fuga? Nihil id, ullam aspernatur tempore optio reiciendis
            unde porro aliquid, sequi earum minima fuga tenetur dolores
            voluptate sint maiores adipisci voluptates quibusdam odit!
            Accusantium possimus deleniti consectetur qui, voluptatem eligendi
            explicabo. Doloribus, illum voluptatibus, in aperiam hic repellat
            vitae, exercitationem vero iusto ex odit temporibus quaerat itaque
            libero accusantium. Sit quo tenetur sint, ducimus esse nihil impedit
            tempora veritatis itaque vitae? Eveniet nesciunt amet corporis
            possimus ad esse ex consequatur architecto! Ullam sequi laboriosam
            minus aliquam accusamus saepe ipsam blanditiis molestias maiores.
            Eveniet odit amet modi aperiam cum nulla quibusdam explicabo,
            adipisci nam ex fuga, sint soluta accusantium ad porro. Aut
            asperiores sequi quisquam eum doloremque cupiditate fugit quaerat
            numquam quas cumque laudantium, architecto, dolor culpa? Aperiam
            vitae magni earum aut, quia repellat dolorum, soluta labore voluptas
            recusandae at est cum omnis iure tenetur hic sapiente harum tempore
            excepturi assumenda impedit pariatur et. Exercitationem porro nisi
            optio iste ipsa obcaecati nulla esse, doloremque laborum veniam
            perferendis accusantium tempore incidunt, temporibus labore
            voluptatem ea dolores molestiae soluta, officiis facilis molestias
            quas cum! Pariatur consequuntur dolor atque. Nisi consectetur, qui
            incidunt, maxime, at voluptatem quod tempore totam labore doloremque
            quae odit facere fugiat. Quo id, ipsam unde hic sit illo iusto
            doloribus fugit, fugiat reiciendis corporis nihil quisquam molestias
            ex?
          </p>
        </div>
      </div>
    </div>
  );
}

export default StoreDetail;
