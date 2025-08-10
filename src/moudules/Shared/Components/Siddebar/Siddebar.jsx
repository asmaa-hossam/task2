import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import sidbarlogo from '../../../../assets/images/sidbarlogo.png'
export default function Siddebar({logOutUser}) {
  let [collabse,setcollabs]=useState(false)
  function toggleCollabs(){
    setcollabs(!collabse)
  }
  return (
    <div className="container-SideBar">
      <Sidebar collapsed={collabse}   style={{padding:'0px',margin:'0px'}}>
  <Menu  className=' rounded-2'  style={{padding:'5px'}}>
    <div className='text-start w-75'>
       <img src={sidbarlogo} alt="" className=' w-100' onClick={toggleCollabs}  /> 
</div>
    <MenuItem className=' mt-5' icon={<i class="fas fa-house-user"></i>} component={<Link to='/dashBoard'/>}> Home </MenuItem>
    <MenuItem  icon={<i class="fas fa-users"></i>} component={<Link to='/dashBoard/users'/>}> Usres </MenuItem>
    <MenuItem  icon={<i class="fas fa-utensils"></i>} component={<Link to='/dashBoard/recipes'/>}> recipes </MenuItem>
    <MenuItem  icon={<i class="fas fa-table"></i>} component={<Link to='/dashBoard/category'/>}> category </MenuItem>
    <MenuItem  icon ={<i class="fas fa-unlock"></i>} component={<Link to='/forgetPass'/>}> forget Pass</MenuItem>
    
    <MenuItem component={<Link to='/forgetPass'/>}> Log Out</MenuItem>

  </Menu>
</Sidebar>;     
    </div>
   


//  {/* <button onClick={()=>logOutUser()} className='btn btn-info'>log out</button> */}
    
  )
}
