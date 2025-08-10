import React from 'react'
import  logo from '../../../../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios';
export default function Login({getlogedUserData}) {
  let navigate=useNavigate();
  let {register,formState:{errors},handleSubmit}=useForm();
  let onSubmit=(data)=>{
axios.post(`https://upskilling-egypt.com:3006/api/v1/Users/Login`, data)
    .then((res)=>{
      localStorage.setItem('token',res.data.token)
      getlogedUserData()
     navigate('/dashBoard')
    })
    .catch((err)=>console.log(err))
  }
  return (
    <>
    <div className="authContainer w-100 vh-100">
      <div className="overlay w-100">
     <div className="row justify-content-center align-items-center  vh-100">
      <div className="col-md-5  bg-white rounded-3 px-5 py-4 ">
       <div className="containerlogo mb-2 text-center">
        <img src={logo} alt="logo"  />
       </div>
       <div className="title">
         <h5 className="fw-bold">Log In</h5>
         <p className="text-muted">Welcome Back! Please enter your details</p>
       </div>
         <form onSubmit={handleSubmit(onSubmit)} >
       <div class="input-group mb-4">
  <span class="input-group-text" id="basic-addon1"> <i class="fas fa-envelope"></i></span>
  <input  type="email" class="form-control" placeholder="Enter your E-mail"  aria-describedby="basic-addon1"
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

<div class="input-group mb-3">
  <span class="input-group-text" id="basic-addon1"> <i class="fas fa-lock"></i></span>
  <input type="password" class="form-control" placeholder="Password"  aria-describedby="basic-addon1"
  {...register('password',{
required:"password is required"
  })}
  />
</div>
{errors.password&&<div className=' alert alert-danger p-0 border-0  bg-light'>{errors.password.message}</div>}

<div className="links d-flex justify-content-between">
 <Link to='/register' className="text-decoration-none" style={{color:'rgba(74, 163, 90, 1)'}} >Register Now?</Link>
  <Link to='/forgetPass'className="text-decoration-none" style={{color:'rgba(58, 58, 61, 1)'}}>Forgot Password?</Link>

</div>
<button className='btn text-light w-100 mt-4' style={{backgroundColor:'rgba(74, 163, 90, 1)'}}>Login</button>
</form>
      </div>

     </div>
</div>
     </div>

    
    </>
  )
}
