import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Headers from '../../../Shared/Components/Header/Headers'
import Table from 'react-bootstrap/Table';
import NoData from '../../../Shared/Components/NoData/NoData';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import nodata from '../../../../assets/images/nodata.png'
import { ClipLoader } from "react-spinners";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { axiosInstant, RECIPES_URLS } from '../../../../Serviece/Url';
export default function RecipesList() {
let[ResipeData,setResipeData]=useState([]);
let[openMenuId,setOpenMenuId]=useState(null);
let[isLOading,setisLOding]=useState(false);
let[isLOadingbtn,setisLOdingbtn]=useState(false);
let[ArrOFPageNO,setArrOFPageNO]=useState([])
let[NameValue,setNameValue]=useState("")
let [selectedCategory, setSelectedCategory] = useState("");
let [categories, setCategories] = useState([]);

let navigate=useNavigate()
{/**modal for deleate */}
  const [show, setShow] = useState(false);
  const[deleateid,setdeleteid]=useState(null)
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
   setdeleteid(id)
    setShow(true);}

let baseIMg='https://upskilling-egypt.com:3006/'


function getCategory() {
    axiosInstant.get(`https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1`,
    )
      .then((res) => {
        setCategories(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

{/**get recipe data */}
  function getRecipeData(pageSize,pageNumber,name, categoryId){
    setisLOding(true)
    axiosInstant.get(RECIPES_URLS.GET_RECIPE(),
  {params:{
    pageSize,
    pageNumber,
    name,
    categoryId
  }})
    .then((res)=>{
      console.log(res);
      
      let ResipePages=(res.data.totalNumberOfPages)
      setArrOFPageNO(Array(ResipePages).fill().map((_,i)=>i+1))
      setisLOding(false)
      setResipeData(res.data.data)
    })
    .catch((err)=>{
      setisLOding(false)
       toast.error(err.response.data.message)
      console.log(err)
    })
  }
  {/**toggle menue */}
 function toggleMenue(id){
  setOpenMenuId(openMenuId===id?null:id)
 }
 {/**getname value */}
let getNameValue=(input)=>{
  let value = input.target.value;
  setNameValue(value)
  getRecipeData(4,1,value,selectedCategory)
}


 {/**delete Recipe */}
  function deleateRecipes(id){
    axiosInstant.delete(RECIPES_URLS.DELEATE_RECIPE(id))
    .then((res)=>{
      handleClose()
      getRecipeData()
     toast.success("Recipe item deleated Successfuly")
      
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  useEffect(()=>{
  getRecipeData()
  getCategory()
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
      <Headers title1={'Recipes'} title2={'Items'} description={'You can now add your items that any user can order it from the Application and you can edit'} />
       
       <div className="container">
         <div className="categoryTitle d-flex justify-content-between align-items-center p-3">  
           <div className="decreption">
          <h4>Recipe Table Details</h4>
       <p className=' text-muted'>You can check all details</p>
          </div>
          <div className="btnn">
                
             <button className=' btn text-light'  onClick={()=>navigate('/dashBoard/recipeData')} style={{backgroundColor:"rgba(0, 146, 71, 1)"}}>Add New Recipe</button>
                     
        
                   </div>
        </div>
 {isLOading? <div className='d-flex justify-content-center align-items-center'><ClipLoader
         color={'green'}
         loading={true}
         size={150}
         aria-label="Loading Spinner"
         data-testid="loader"
       /></div>:<></>}
<div className="d-flex justify-content-between mx-4 mb-4" >
        <input type="text" className='form-control mx-5' onChange={getNameValue} placeholder='search by name----'/>
        <input type="text" className='form-control mx-5'  placeholder='search by tagname----'/>
         <select 
    className="form-control" 
    value={selectedCategory} 
    onChange={(e)=>{
      setSelectedCategory(e.target.value);
      getRecipeData(4,1,NameValue,e.target.value);
    }}
  >
    <option value="">All Categories</option>
    {categories.map((cat)=>(
      <option key={cat.id} value={cat.id}>{cat.name}</option>
    ))}
  </select>
      </div>

       {ResipeData.length>0? <Table striped bordered hover className='ms-4'>
      <thead>
        <tr  className=' text-center'>
         
          <th>name</th>
          <th>imagePath</th>
          <th>price</th>
           <th>cateory</th>
          <th>description</th>
          <th>TagName</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
       {ResipeData?.map((RecipeItem)=><tr key={RecipeItem.id} className=' text-center'>
         
          <td>{RecipeItem.name}</td>
          <td>{RecipeItem.imagePath?<img src={`${baseIMg}${RecipeItem.imagePath}`}style={{width:"30px"}} />:<img src={nodata} style={{width:"30px"}}/>}</td>
          <td>{RecipeItem.price}</td>
          <td>{RecipeItem?.category[0]?.name}</td>
          <td>{RecipeItem.description}</td>
          <td>{RecipeItem.tag.name}</td>
          <td className=' position-relative'><i className="bi bi-three-dots" onClick={(e)=>{toggleMenue(RecipeItem.id); e.stopPropagation()}} style={{ cursor: "pointer" }}></i>
        {RecipeItem.id===openMenuId&&<div
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
         <div className="p-2" style={{ cursor: "pointer" }}><i className="fas fa-pen mx-2" style={{color:'rgba(0, 146, 71, 1)'}} ></i>Edit</div>
        <div className="p-2 " style={{ cursor: "pointer" }}> <i className="fas fa-trash mx-2" onClick={()=>handleShow(RecipeItem.id)} style={{color:'rgba(0, 146, 71, 1)'}} ></i>Delete</div>
          

        </div>}
          
          </td>
        </tr>)}
      </tbody>
      
    </Table>:<div className=' text-center'><NoData/></div>}

    <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {ArrOFPageNO.map((PageNo,i)=><li key={i} className="page-item"
    onClick={()=>getRecipeData(4,PageNo)}
    ><a className="page-link" href="#">{PageNo}</a></li>)}
    
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
    

{/**deleate modal */}
    <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
       </Modal.Header>
       <Modal.Body className=' text-center'>
       <img src={nodata} lt=""  className=' '/>
     <h4>Delete This Resipe ?</h4>
       <p className=' text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
       </Modal.Body  >
        
       <Modal.Footer>
       <Button onClick={()=>deleateRecipes(deleateid)} className='btn btn-outline-danger btn-light '>         
          Delete This item
                  </Button>
      </Modal.Footer>
       </Modal>
         

       </div>

    </>
  )
}
