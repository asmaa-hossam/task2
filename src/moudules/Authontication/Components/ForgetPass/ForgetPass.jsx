import React from 'react'
import logo from'../../../../assets/images/logo.png'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
   import {  toast } from 'react-toastify';

export default function ForgetPass() {
let navigate=useNavigate()
   let {register,formState:{errors},handleSubmit}=useForm();
  let onSubmit=(data)=>{
axios.post(`https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request`,data)
    .then((res)=>{
      navigate('/resetPass')
      toast.success("your request is being prossed pleas checked out your mail")
     console.log(res)
    })
    .catch((err)=>console.log(err))
  }
  return (
    <>
      <div className="authContainer w-100 vh-100">
      <div className="overlay w-100">
     <div className="row justify-content-center align-items-center  vh-100">
      <div className="col-md-6  bg-white rounded-3 px-5 py-4 ">
<div className="containerlogo mb-2 text-center">
        <img src={logo} alt="logo"  />
       </div>
       <div className="title">
         <h5 className="fw-bold"> Forgot Your Password?</h5>
         <p className="text-muted">No worries! Please enter your email and we will send a password reset link </p>
        
       </div>

         <form onSubmit={handleSubmit(onSubmit)} >
       <div className="input-group mb-4">
  <span className="input-group-text" id="basic-addon1"> <i className="fas fa-envelope"></i></span>
  <input  type="email" className="form-control" placeholder="Enter your E-mail"  aria-describedby="basic-addon1"
  {...register('email',
    {
      required:"email is required",
      pattern:{
        value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message:"email not valid"
      }
    }
  )}
  />
</div>
{errors.email&&<div className=' alert alert-danger  p-0 border-0  bg-light'>{errors.email.message}</div>}
<button className='btn text-light w-100 mt-4' style={{backgroundColor:'rgba(74, 163, 90, 1)'}}>Submit</button>

</form>


      </div>

     </div>
</div>
     </div>
 
    </>
  )
}
