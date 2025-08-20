import React, { useState } from 'react';
import Siddebar from '../Siddebar/Siddebar';
import NavBar from '../NavBar/NavBar';
import { Outlet } from 'react-router-dom';

export default function MasterLayout({ loginData, logOutUser }) {
  const [collabse, setCollabs] = useState(false);

  function toggleCollabs() {
    setCollabs(!collabse);
  }

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: collabse ? "80px" : "220px", transition: "0.3s" }}>
        <Siddebar
          logOutUser={logOutUser}
          collabse={collabse}
          toggleCollabs={toggleCollabs}
        />
      </div>

      {/* Content */}
      <div className="flex-grow-1 d-flex flex-column">
        <NavBar loginData={loginData} />
        <div className="flex-grow-1 p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

