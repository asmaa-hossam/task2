import React, { useState } from 'react'
import logo from'../../../../assets/images/logo.png'
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { axiosInstant, USERS_URLS } from '../../../../Serviece/Url';
import { EMAIL_VALIDATION } from '../../../../Serviece/validation';
export default function ResetPass() {
  let navigate=useNavigate()
  let location=useLocation()
 let [isVisablePass,setIsVisable]=useState(false)
   let {register,formState:{errors},handleSubmit,watch}=useForm({defaultValues:{
    email:location.state
   }});
  let onSubmit=(data)=>{
axiosInstant.post(USERS_URLS.RESET_PASS,data)
    .then((res)=>{
      navigate('/login')
     console.log(res)
    })
    .catch((err)=>console.log(err))
  }
  return (
    <>
       

              <div className="title">
                <h5 className="fw-bold"> Reset  Password</h5>
                <p className="text-muted">Please Enter Your Otp  or Check Your Inbox</p>
               
              </div>
       
                <form onSubmit={handleSubmit(onSubmit)} >
                  {/**email */}
              <div className="input-group mb-4">
         <span className="input-group-text" id="basic-addon1"> <i className="fas fa-envelope"></i></span>
         <input  type="email" className="form-control" disabled={true} placeholder="Enter your E-mail"  aria-describedby="basic-addon1"
         {...register('email')}
         />
       </div>       

 {/**otp */}
        <div className="input-group mb-4">
         <span className="input-group-text" id="basic-addon1"> <i className="fas fa-key"></i></span>
         <input  type="text" className="form-control" placeholder="OTP"  aria-describedby="basic-addon1"
         {...register('seed',
           {
             required:"seed is required",
            
           }
         )}
         />
       </div>
       {errors.seed&&<div className=' alert alert-danger  p-0 border-0  bg-light'>{errors.seed.message}</div>}
{/**password */}
      <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1"> <i className="fas fa-lock"></i></span>
  <input type={isVisablePass?"text":"password"}
   className="form-control" placeholder="Password"  aria-describedby="basic-addon1"
  {...register('password',{
required:"password is required"
  })}
  />
    <button type="button" className="input-group-text" id="basic-addon1"
     onClick={()=>setIsVisable(!isVisablePass)}
     onMouseDown={(e)=>e.preventDefault()}
      onMouseUp={(e)=>e.preventDefault()}
    > <i className= {isVisablePass?"fas fa-eye":"fas fa-eye-slash"}></i></button>

</div>
{errors.password&&<div className=' alert alert-danger p-0 border-0  bg-light'>{errors.password.message}</div>}

{/**reset password */}
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1"> <i className="fas fa-lock"></i></span>
  <input type="password" className="form-control" placeholder="Confirm New Password"  aria-describedby="basic-addon1"
  {...register('confirmPassword', {
 required: 'Confirm Password is required',
   validate: (value) =>
   value === watch('password') || 'Passwords do not match',
                  })}
 
  />
</div>
{errors.confirmPassword&&<div className=' alert alert-danger p-0 border-0  bg-light'>{errors.confirmPassword.message}</div>}
       <button className='btn text-light w-100 mt-4' style={{backgroundColor:'rgba(74, 163, 90, 1)'}}
      
       >Reset Password</button>
       
       </form>
       
     
    </>
  )
}
