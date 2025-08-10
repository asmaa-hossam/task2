import React from 'react'
import navlogo from '../../../../assets/images/navlogo.png'
export default function NavBar({loginData}) {
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Food app</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item d-flex">
          <img src={navlogo} alt="" />
          <a class="nav-link" href="#">{loginData?loginData.userName:"defultUser"}</a>
          
        </li>
       
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}
