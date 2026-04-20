import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';


export default function ResetPass() {

  const navigate = useNavigate();

  let {register,handleSubmit,formState:{errors},getValues,watch}=useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit=async(data)=>{
    try {
      setLoading(true)
      const response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset",data);
      const message = response?.data?.message || "Password reset successful";
      toast.success(message);
      navigate("/login");
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
        <h3 className='auth-title'>Reset Password</h3>
        <span className='auth-subtitle'>Please Enter Your Otp  or Check Your Inbox</span>
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
          )} data-tooltip-id='email-tooltip' type="email" className={`form-control ${errors.email ? "is-invalid" : ""}
          ${!errors.email && watch("email") ? "is-valid" : "" }`} aria-describedby='emailelpBlock' placeholder="Enter your E-mail"/>
        </div>
          {errors.email && <Tooltip id='email-tooltip' place='top' defaultIsOpen>{errors.email.message}</Tooltip>}
          <div className="auth-input-group mb-4">
          <span className='auth-icon'>
            <i className="fa-solid fa-lock"></i>
          </span>
          <div className="divider"></div>
          <input {...register("seed",
            {required:"Field is Required",
              minLength:{
                value:4,
                message: "OTP must be 4 digits"
              },
              maxLength: {
                value:4,
                message: "OTP must be 4 digits"
              }
            }
          )} data-tooltip-id='seed-tooltip' type="text" className={`form-control ${errors.seed ? "is-invalid" : ""}
          ${!errors.seed && watch("seed") ? "is-valid" : "" }`} aria-describedby='otpelpBlock' placeholder="OTP"/>
        </div>
          {errors.seed && <Tooltip id='seed-tooltip' place='top' defaultIsOpen>{errors.seed.message}</Tooltip>}
          <div className="auth-input-group mb-4">
          <span className='auth-icon'>
            <i className="fa-solid fa-lock"></i>
          </span>
          <div className="divider"></div>
          <input {...register("password",
            {required:"Field is Required",
              pattern:{
                value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                message:"Min 8 chars, 1 uppercase, 1 lowercase, 1 number , 1 special character"
              }
            }
          )} data-tooltip-id='pass-tooltip' type="password" className={`form-control ${errors.password ? "is-invalid" : ""}
          ${!errors.password && watch("password") ? "is-valid" : "" }`} aria-describedby='passwordelpBlock' placeholder="New Password"/>
        </div>
          {errors.password && <Tooltip id='pass-tooltip' place='top' defaultIsOpen>{errors.password.message}</Tooltip>}
          <div className="auth-input-group mb-4">
          <span className='auth-icon'>
            <i className="fa-solid fa-lock"></i>
          </span>
          <div className="divider"></div>
          <input {...register("confirmPassword",
            {required:"Field is Required",
              validate:(val) => {
                if(getValues("password") !== val) {
                  return "Your passwords do not match"
                }
              }
            }
          )} data-tooltip-id='confirm-tooltip' type="password" className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}
          ${!errors.confirmPassword && watch("confirmPassword") ? "is-valid" : "" }`} aria-describedby='passwordelpBlock' placeholder="Confirm New Password"/>
        </div>
          {errors.confirmPassword && <Tooltip id='confirm-tooltip' place='top' defaultIsOpen>{errors.confirmPassword.message}</Tooltip>}
        <button className='btn btn-success auth-btn-colors w-100' disabled={loading}>
          {loading ? (
            <span className="spinner-border spinner-border-sm me-2"></span>
          ) : "Reset Password"}
        </button>
      </form>
    </div>
  )
}
