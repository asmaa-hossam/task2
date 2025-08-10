import React from 'react'
import logo from'../../../../assets/images/logo.png'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function ResetPass() {
  let navigate=useNavigate()
   let {register,formState:{errors},handleSubmit,watch}=useForm();
  let onSubmit=(data)=>{
axios.post(`https://upskilling-egypt.com:3006/api/v1/Users/Reset`,data)
    .then((res)=>{
      navigate('/login')
     console.log(res)
    })
    .catch((err)=>console.log(err))
  }
  return (
    <>
       <div className="authContainer w-100 vh-100">
      <div className="overlay w-100">
     <div className="row justify-content-center align-items-center  vh-100">
      <div className="col-md-6  bg-white rounded-3 py-4 px-3 ">
       <div className="containerlogo mb-2 text-center">
               <img src={logo} alt="logo"  />
              </div>
              <div className="title">
                <h5 className="fw-bold"> Reset  Password</h5>
                <p className="text-muted">Please Enter Your Otp  or Check Your Inbox</p>
               
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
       


        <div class="input-group mb-4">
         <span class="input-group-text" id="basic-addon1"> <i class="fas fa-key"></i></span>
         <input  type="text" class="form-control" placeholder="OTP"  aria-describedby="basic-addon1"
         {...register('seed',
           {
             required:"seed is required",
            
           }
         )}
         />
       </div>
       {errors.seed&&<div className=' alert alert-danger  p-0 border-0  bg-light'>{errors.seed.message}</div>}

      <div class="input-group mb-3">
  <span class="input-group-text" id="basic-addon1"> <i class="fas fa-lock"></i></span>
  <input type="password" class="form-control" placeholder="Password"  aria-describedby="basic-addon1"
  {...register('password',{
required:"password is required"
  })}
  />
</div>
{errors.password&&<div className=' alert alert-danger p-0 border-0  bg-light'>{errors.password.message}</div>}


<div class="input-group mb-3">
  <span class="input-group-text" id="basic-addon1"> <i class="fas fa-lock"></i></span>
  <input type="password" class="form-control" placeholder="Confirm New Password"  aria-describedby="basic-addon1"
  {...register('confirmPassword', {
 required: 'Confirm Password is required',
   validate: (value) =>
   value === watch('password') || 'Passwords do not match',
                  })}
 
  />
</div>
{errors.confirmPassword&&<div className=' alert alert-danger p-0 border-0  bg-light'>{errors.confirmPassword.message}</div>}
       <button className='btn text-light w-100 mt-4' style={{backgroundColor:'rgba(74, 163, 90, 1)'}}>Reset Password</button>
       
       </form>
       
      </div>

     </div>
</div>
     </div>

    </>
  )
}
