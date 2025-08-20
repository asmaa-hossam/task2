import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Headers from '../../../Shared/Components/Header/Headers'
import NoData from '../../../Shared/Components/NoData/NoData'
 import {  CSSProperties } from "react";
import { ClipLoader } from "react-spinners";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import nodata from '../../../../assets/images/nodata.png'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { axiosInstant, CATEGORIES_URLS } from '../../../../Serviece/Url'

export default function CategoriesList() {
let[categoryData,setCategoryData]=useState([])
let[isLOading,setisLOding]=useState(false);
let[isLOadingbtn,setisLOdingbtn]=useState(false);
 let{register,formState:{errors},handleSubmit, reset}=useForm();
let[NOPagesInArray,setNoPagesInArray]=useState([])
let[openMenuId,setOpenMenuId]=useState(null)
let[NameValue,setNameValue]=useState("")

let [caregoryId,setCategoryId]=useState(null)
{/*delete modal */ }
 const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) =>{
    setCategoryId(id)
    setShow(true);}

    {/*add modal */ }
 const [showAdd, setShowAdd] = useState(false);
 var[editId,setEditId]=useState(null);
 let[isEdit,setIsEdit]=useState(false)
  const handleCloseAdd = () => setShowAdd(false);

  const handleShowAdd = (category=null) =>{
    if(category){
    setEditId(category.id);
    setIsEdit(true);
    console.log(category.id)
   reset({name:category.name})
    }
    else{
setEditId(null)
setIsEdit(false)
reset({name:""})
} setShowAdd(true); }

{/* انهي category مفتوحه */ }
 const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  {/* بتجيب الداتا الي جوا category */ }
  function getCategoryData(pageSize,pageNumber,name){
    setisLOding(true)
    axiosInstant.get(CATEGORIES_URLS.GET_CATEGORIES(),
    {params:{
      pageSize,
      pageNumber,
      name,
    }}
    )
    .then((res)=>{
    let NofPages=Number(res.data.totalNumberOfPages)
     setNoPagesInArray(Array(NofPages).fill().map((_,i)=>i+1))
      setCategoryData(res.data.data)
      setisLOding(false)
    })
    .catch((err)=>{
      toast.error(err.response.data.message)
      setisLOding(false)
    })
  }
{/**add newCategory */}
function CreateCategory(name){
  setisLOdingbtn(true)
axios.post(`https://upskilling-egypt.com:3006/api/v1/Category/`,name,
   {headers:{
        Authorization:localStorage.getItem("token")
      }}
)
 .then((res)=>{
   console.log(res)
      getCategoryData()
      setisLOdingbtn(false)
      handleCloseAdd()
      toast.success("categoryItem Added successfuly")
    })
    .catch((err)=>{
      console.log(err)
      setisLOdingbtn(false)
      handleCloseAdd()
    })
}

{/**getname value */}
let getNameValue=(input)=>{
  console.log(input.target.value)
setNameValue(input.target.value)
getCategoryData(4,1,input.target.value)
}
  {/**deleate Category */}
  function deleateCategory(id){
  axiosInstant.delete(CATEGORIES_URLS.DELEATE_CATEGORY(id),
  )
  .then((res)=>{
    handleClose();
    getCategoryData()
    toast.success("Category item deleated Successfuly")
  })
  .catch((err)=>{
    console.log(err)
  })
  }
    {/**update Category */}
  function updateCategory(data){
  axios.put(`https://upskilling-egypt.com:3006/api/v1/Category/${editId}`,data,
    {headers:{Authorization:localStorage.getItem("token")}}
  )
  .then((res)=>{
    handleCloseAdd()
    getCategoryData()
    toast.success("ubdating Categort Successfuly")
   console.log(res)
  })
  .catch((err)=>{
    console.log(err)
  })
  }
  
  useEffect(()=>{
getCategoryData()
 const handleClickOutside = () => {
      setOpenMenuId(null);
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  },[])
  return (
    <>
    <div className="container">
      <Headers title1={'Categories'} title2={'item'} description={'You can now add your items that any user can order it from the Application and you can edit'}/>
       <div className="categoryTitle d-flex justify-content-between align-items-center p-2">
           <div className="decreption">
           <h4>Categories Table Details</h4>
           <p>You can check all details</p>
          </div>
           <div className="btnn">
            {isLOadingbtn?<><button className=' btn text-light'  style={{backgroundColor:"rgba(0, 146, 71, 1)"}}>
              <ClipLoader
        color={'green'}
        loading={true}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"/>
              Add New Category</button></>:
              <button className=' btn text-light' onClick={()=>handleShowAdd()}  style={{backgroundColor:"rgba(0, 146, 71, 1)"}}>Add New Category</button>
            
}
          </div>
        </div>

{isLOading? <div className='d-flex justify-content-center align-items-center'><ClipLoader
        color={'green'}
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div>:<></>}
      <input type="text" className=' form-control ms-4 rounded-2 mb-2' onChange={getNameValue}  placeholder='search by name.......'/>

{categoryData.length>0?<Table striped bordered hover className='ms-4'>
      <thead>
        <tr>
          <th>#</th>
          <th>name</th>
          <th>creation date</th>
          <th>action</th>
        </tr>
      </thead>
    {categoryData?.map((itemCategory)=><tbody key={itemCategory.id}>
        <tr>
          <td>{itemCategory.id}</td>
          <td>{itemCategory.name}</td>
          <td>{itemCategory.creationDate}</td>
          <td className=' position-relative'><i className="bi bi-three-dots "
           style={{ cursor: "pointer" }}
          onClick={(e)=>{
            e.stopPropagation()
            toggleMenu(itemCategory.id)}}
          ></i>
          {openMenuId === itemCategory.id && (
                <div
                  style={{
                    position: "absolute",
                    top: "0px",
                    left: "-70px",
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                    zIndex: 10
                  }}
                  onClick={(e)=>{
                   e.stopPropagation()
                  }}
                >
                  <div className="p-2" style={{ cursor: "pointer" }}><i className="fas fa-eye mx-2" style={{color:'rgba(0, 146, 71, 1)'}}></i>View</div>
                  <div className="p-2" style={{ cursor: "pointer" }}><i className="fas fa-pen mx-2" style={{color:'rgba(0, 146, 71, 1)'}} onClick={()=>handleShowAdd(itemCategory)}></i>Edit</div>
                  <div className="p-2 " style={{ cursor: "pointer" }}> <i className="fas fa-trash mx-2" style={{color:'rgba(0, 146, 71, 1)'}} onClick={()=>handleShow(itemCategory.id)}></i>Delete</div>
                </div>
              )}
          
          </td>
        </tr>
      </tbody>)}
    </Table>:<NoData/>}

<nav aria-label="Page navigation example ">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {NOPagesInArray.map((pageNo,i)=><li key={i} onClick={()=>getCategoryData(4,pageNo)} className="page-item"><a className="page-link" href="#">{pageNo}</a></li>)}
    

    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>


{/**deleate modal */}
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
          <Button onClick={()=>deleateCategory(caregoryId)} className='btn btn-outline-danger btn-light '>
           Delete This item
           </Button>
        </Modal.Footer>
      </Modal>
</div>

 {/*add modal*/}
        <div className="data">
       <Modal show={showAdd} onHide={handleCloseAdd}>
          <Modal.Header closeButton>
             <Modal.Title>{isEdit?'UpdateCategory':"AddCategory"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
        <form onSubmit={handleSubmit(isEdit?updateCategory:CreateCategory)} >  
        
         <input type="text" className='form-control'  placeholder='Category Name' 
         {...register("name",
           {required:"this feild is required"}
          )}
          />
       {errors.name&&<div className="alert  alert-danger mt-2 p-0">{errors.name.message}</div>}

       <button  className='btn btn-success text-light mt-5 d-block' type='submit'>
           {isEdit?'Update':"save"}
          </button>
   </form>
     </Modal.Body  >
       
    </Modal>
         
       </div>

    </div>
    </>
  )
}
