import React from 'react';
import logo from '../../../../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function Login({ getlogedUserData }) {
  let navigate = useNavigate();
  let { register, formState: { errors }, handleSubmit } = useForm();

  let onSubmit = (data) => {
    axios.post(`https://upskilling-egypt.com:3006/api/v1/Users/Login`, data)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        getlogedUserData();
        navigate('/dashBoard');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="authContainer w-100 vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="overlay w-100 h-100 d-flex justify-content-center align-items-center p-3">
        
        <div className="bg-white rounded-3 p-4 p-sm-5 shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
          
          <div className="containerlogo mb-3 text-center">
            <img src={logo} alt="logo" className="img-fluid" style={{ maxWidth: '120px' }} />
          </div>

         
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
                {...register('email', {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Email not valid"
                  }
                })}
              />
            </div>
            {errors.email && <div className="alert alert-danger p-1">{errors.email.message}</div>}

           
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                {...register('password', { required: "Password is required" })}
              />
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

            <button type="submit" className="btn text-light w-100 mt-4" style={{ backgroundColor: 'rgba(74, 163, 90, 1)' }}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
