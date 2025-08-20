import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { axiosInstant, USERS_URLS } from '../../../../Serviece/Url';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../../../Serviece/validation';

export default function Login({ getlogedUserData }) {
  let navigate = useNavigate();
  let { register, formState: { errors,isSubmitting }, handleSubmit } = useForm();
   let[showPas,setShowPass]=useState(false)
   let toggleshow=()=>{
    setShowPass(!showPas)
   }
  let onSubmit = async (data) => {
   return axiosInstant.post(USERS_URLS.LOGIN, data)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        getlogedUserData();
        navigate('/dashBoard');
      })
      .catch((err) => console.log(err));
  };

  return (
    
<>
         
          <div className="title text-center">
            <h5 className="fw-bold">Log In</h5>
            <p className="text-muted">Welcome Back! Please enter your details</p>
          </div>

          
          <form onSubmit={handleSubmit(onSubmit)}>
           
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your E-mail"
                {...register('email', EMAIL_VALIDATION)}
              />
            </div>
            {errors.email && <div className="alert alert-danger p-1">{errors.email.message}</div>}

           {/**password */}
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type={showPas?"text":"password"}
                className="form-control"
                placeholder="Password"
                {...register('password',PASSWORD_VALIDATION)}
              />
               <button type="button" className="input-group-text"
                onMouseDown={(e)=>e.preventDefault()}
                 onMouseUp={(e)=>e.preventDefault()}
                 onClick={toggleshow}
               >

                <i  className= {showPas?"fas fa-eye":"fas fa-eye-slash"} ></i>
              </button>
            </div>
            {errors.password && <div className="alert alert-danger p-1">{errors.password.message}</div>}

               <div className="links d-flex flex-column flex-sm-row justify-content-between text-center text-sm-start gap-2">
              <Link to='/register' className="text-decoration-none" style={{ color: 'rgba(74, 163, 90, 1)' }}>
                Register Now?
              </Link>
              <Link to='/forgetPass' className="text-decoration-none" style={{ color: 'rgba(58, 58, 61, 1)' }}>
                Forgot Password?
              </Link>
            </div>
             
            
            <button type="submit" disabled={isSubmitting} className="btn text-light w-100 mt-4" style={{ backgroundColor: 'rgba(74, 163, 90, 1)' }}>
             {isSubmitting ? "Submitting..." : "Login"}
            </button>
           
          </form>
       </>
  );
}
