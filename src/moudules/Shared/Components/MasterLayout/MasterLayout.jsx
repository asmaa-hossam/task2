import React from 'react'
import Siddebar from '../Siddebar/Siddebar'
import NavBar from '../NavBar/NavBar'
import Headers from '../Header/Headers'
import { Outlet } from 'react-router-dom'

export default function MasterLayout({loginData, logOutUser}) {
  return (
    <>
       <div className="d-flex">
           <div className='col-md-3'>
            <Siddebar  logOutUser={logOutUser}/>
           </div>
          <div className="col-md-9">
            <NavBar loginData={loginData} />
           
            <Outlet/>
           </div>
       </div>
    </>
  )
}
