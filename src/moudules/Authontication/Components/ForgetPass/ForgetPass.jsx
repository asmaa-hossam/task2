import React from 'react'
import logo from'../../../../assets/images/logo.png'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { EMAIL_VALIDATION } from '../../../../Serviece/validation';
import { axiosInstant, USERS_URLS } from '../../../../Serviece/Url';

export default function ForgetPass() {
  let navigate = useNavigate();

  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm();

  
  let onSubmit = async (data) => {
    try {
      let res = await axiosInstant.post(USERS_URLS.FORGET_PASS, data);
      toast.success(res.data.message || "Check your mail");
      navigate('/resetPass',{state:data.email});
      console.log(res);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
      console.log(err);
    }
  };

  return (
    <>
      <div className="title">
        <h5 className="fw-bold">Forgot Your Password?</h5>
        <p className="text-muted">
          No worries! Please enter your email and we will send a password reset link
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-4">
          <span className="input-group-text" id="basic-addon1">
            <i className="fas fa-envelope"></i>
          </span>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your E-mail"
            aria-describedby="basic-addon1"
            {...register('email', EMAIL_VALIDATION)}
          />
        </div>

        {errors.email && (
          <div className="alert alert-danger p-0 border-0 bg-light">
            {errors.email.message}
          </div>
        )}

        <button
          disabled={isSubmitting}
          className="btn text-light w-100 mt-4"
          style={{ backgroundColor: 'rgba(74, 163, 90, 1)' }}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
}
