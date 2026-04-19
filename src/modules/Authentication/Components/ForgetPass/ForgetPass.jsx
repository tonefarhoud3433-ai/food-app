import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';

export default function ForgetPass() {

  const navigate = useNavigate();

  let {register,handleSubmit,formState:{errors},watch}=useForm();

  const [loading,setLoading] = useState(false)

  const onSubmit=async(data)=>{
    try {
      setLoading(true)
      const response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",data);
      const message = response?.data?.message || "Email sent successfully";
      toast.success(message);
      navigate("/reset-pass");
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="title my-4">
        <h3 className='auth-title'>Forgot Your Password?</h3>
        <span className='auth-subtitle'>No worries! Please enter your email and we will send a password reset link</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-input-group mb-4">
          <span className='auth-icon'>
            <i className="fa-solid fa-envelope"></i>
          </span>
          <div className="divider"></div>
          <input {...register("email",
            {required:"Field is Required",
            pattern:{
              value:/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message:"Email is not valid"
            }
            }
          )} type="email" data-tooltip-id='email-tooltip' className={`form-control ${errors.email ? "is-invalid" : ""}
          ${!errors.email && watch("email") ? "is-valid" : "" }`} aria-describedby='emailelpBlock' placeholder="Enter your E-mail"/>
        </div>
          {errors.email && <Tooltip id='email-tooltip' place='top'>{errors.email.message}</Tooltip>}
        <button className='btn btn-success auth-btn-colors w-100' disabled={loading}>
          {loading ? (
            <span className="spinner-border spinner-border-sm me-2"></span>
          ): "Submit"}
        </button>
      </form>
    </div>
  )
}
