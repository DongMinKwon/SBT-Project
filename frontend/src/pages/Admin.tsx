// Copyright (C) 2023 Intel Corporation
// SPDX-License-Identifier: MIT
import './Admin.scss';
import './Stars.scss';

function Admin() {
  return (
    <div className="admin">
      <div id="stars" />
      <div id="stars2" />
      <div id="stars3" />
      <div className="admin-heading">
        <div className="admin-heading__container">
          <h1 className="admin-heading__h1">
            Introducing the new <br /> SBT and DID information offering system.
          </h1>
          <div className="admin-button__container">
            <div className="admin-button">
              Start using &quot;Did You Eat&quot; system
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
