import React from 'react'
import { Outlet } from 'react-router-dom'
import logo from '../../../../assets/images/logo.png';

export default function AuthLayout() {
  return (
    <div>
      <div className="authContainer w-100 vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="overlay w-100 h-100 d-flex justify-content-center align-items-center p-3">
        
        <div className="bg-white rounded-3 p-4 p-sm-5 shadow-sm" >
          
          <div className="containerlogo mb-3 text-center">
            <img src={logo} alt="logo" className="img-fluid"  />
        
      <Outlet/>
        </div>
           </div>
      </div>
    </div>
    </div>
  )
}
