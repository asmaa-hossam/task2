import React from 'react'
import Siddebar from '../Siddebar/Siddebar'
import NavBar from '../NavBar/NavBar'
import Headers from '../Header/Headers'
import { Outlet } from 'react-router-dom'

export default function MasterLayout({loginData, logOutUser}) {
  return (
    <>
    <div className="container-fluid">
       <div className="row">
           <div className='col-md-2'>
            <Siddebar  logOutUser={logOutUser}/>
           </div>
          <div className="col-md-10 ">
            <NavBar loginData={loginData} />
            <Outlet/>
           </div>
       </div>
       </div>
    </>
  )
}
