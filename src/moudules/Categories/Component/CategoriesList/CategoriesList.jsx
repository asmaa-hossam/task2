import React, { useEffect, useState } from 'react'
import Headers from '../../../Shared/Components/Header/Headers'
import axios from 'axios';
import NoData from '../../../Shared/Components/NoData/NoData';
import {  CSSProperties } from "react";
import { ClipLoader } from "react-spinners";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import nodata from '../../../../assets/images/nodata.png'

export default function CategoriesList() {
  let[categorylist,setcategoryList]=useState([]);
    const [show, setShow] = useState(false);
    const [ItemId, setItemID] = useState(0);

  let[isloading,setisloading]=useState(false)
   const handleClose = () => setShow(false);
  const handleShow = (id) =>{
    setItemID(id)
setShow(true);
  } 

function getCategory(){
    axios.get(`https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1`,
      {headers:{Authorization:localStorage.getItem('token')}}
    )
    .then((res)=>{
      setisloading(true)
      setcategoryList(res.data.data)
      
    })
    .catch((err)=>{
      console.log(err)
      setisloading(false)
    })
  }

  function deleateCategory(){
    axios.delete(`https://upskilling-egypt.com:3006/api/v1/Category/${ItemId}`,
      {headers:{Authorization:localStorage.getItem('token')}}
    )
    .then((res)=>{
      handleClose()
      getCategory()
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  
  useEffect(()=>{
getCategory()
  },[])
  return (
    <>
      <Headers  title1={'Categories'} title2={'Items'} 
           description={'You can now add your items that any user can order it from the Application and you can edit'}/>
        <div className="categoryTitle d-flex justify-content-between align-items-center p-3">
          <div className="decreption">
          <h4>Categories Table Details</h4>
          <p>You can check all details</p>
          </div>
          <div className="btnn">
          <button className=' btn text-light ' style={{backgroundColor:"rgba(0, 146, 71, 1)"}}>Add New Category</button>
          </div>
        </div>
        <div className="data">
        
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
         
        </Modal.Header>
        <Modal.Body className=' text-center'>
        <img src={nodata} alt=""  className=' '/>
        <h4>Delete This Category ?</h4>
        <p className=' text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
        </Modal.Body  >
        
        <Modal.Footer>
          <Button onClick={deleateCategory} className='btn btn-outline-danger btn-light '>
            Delete This item
          </Button>
        </Modal.Footer>
      </Modal>
         
         {categorylist?.length>0? <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">name</th>
      <th scope="col">creation date</th>
      <th scope="col">action</th>

    </tr>
  </thead>
  <tbody>
   {categorylist.map((item)=><tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.creationDate}</td>
      <td><i class="fas fa-pen mx-3 text-warning"></i>
     <i class="fas fa-trash text-danger"  onClick={()=>handleShow(item.id)}></i>
</td>
    </tr>
   )}
   
  </tbody>
</table>:<NoData/>}
  
        </div>
    </>
  )
}
