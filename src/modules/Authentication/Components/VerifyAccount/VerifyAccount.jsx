import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import axiosClient from '../../../../api/axiosClient';

export default function VerifyAccount() {

  const navigate = useNavigate();

  let {register,handleSubmit,formState:{errors},watch}=useForm({mode:"onChange"});

    const [loading, setLoading] = useState(false);
  

  const onSubmit=async(data)=>{
    try {
      setLoading(true)
      const response = await axiosClient.put("/Users/verify",data);
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
        <h3 className='auth-title'>Verify Account</h3>
        <span className='auth-subtitle'>Please Enter Your Otp  or Check Your Inbox</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row gy-2 gy-lg-4 gx-3 gx-lg-5">
          <div className="col-12">
            <div className="auth-input-group">
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
          {errors.email && <small className="invalid-feedback d-block">{errors.email.message}</small>}
          </div>
          <div className="col-12">
            <div className="auth-input-group">
          <span className='auth-icon'>
            <i className="fa-solid fa-lock"></i>
          </span>
          <div className="divider"></div>
          <input {...register("code",
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
          )} data-tooltip-id='code-tooltip' type="text" className={`form-control ${errors.code ? "is-invalid" : ""}
          ${!errors.code && watch("code") ? "is-valid" : "" }`} aria-describedby='otpelpBlock' placeholder="OTP"/>
        </div>
          {errors.code && <small className="invalid-feedback d-block">{errors.code.message}</small>}
          </div>
        </div>
        <button className='btn btn-success auth-btn-colors w-100 mt-4' disabled={loading}>
          {loading ? (
            <span className="spinner-border spinner-border-sm me-2"></span>
          ) : "Send"}
        </button>
      </form>
    </div>
  )
}
