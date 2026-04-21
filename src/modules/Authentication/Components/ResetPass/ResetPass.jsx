import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function ResetPass() {

  const navigate = useNavigate();

  let {register,handleSubmit,formState:{errors},getValues,watch}=useForm({mode:"onChange"});

  const [loading, setLoading] = useState(false);
  const [showPassword,setShowPassword]= useState(false);
  const [showConfirmPassword,setShowConfirmPassword]= useState(false);

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
        <div className='row gy-2 gy-lg-4 gx-3 gx-lg-5'>
          {/* email */}
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
          )} type="email" className={`form-control ${errors.email ? "is-invalid" : ""}
          ${!errors.email && watch("email") ? "is-valid" : "" }`} aria-describedby='emailelpBlock' placeholder="Enter your E-mail"/>
        </div>
          {errors.email && <small className="invalid-feedback d-block">{errors.email.message}</small>}
          </div>
          {/* seed */}
          <div className="col-12">
            <div className="auth-input-group">
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
          )} type="text" className={`form-control ${errors.seed ? "is-invalid" : ""}
          ${!errors.seed && watch("seed") ? "is-valid" : "" }`} aria-describedby='otpelpBlock' placeholder="OTP"/>
        </div>
          {errors.seed && <small className="invalid-feedback d-block">{errors.seed.message}</small>}
          </div>
          {/* password */}
          <div className="col-12">
            <div className="auth-input-group">
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
          )} type={`${showPassword ? "text" : "password"}`} className={`form-control ${errors.password ? "is-invalid" : ""}
          ${!errors.password && watch("password") ? "is-valid" : "" }`} aria-describedby='passwordelpBlock' placeholder="New Password"/>
          <span className='auth-icon'>
            <i style={{cursor:"pointer"}} onClick={()=> setShowPassword(!showPassword)} className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
          </span>
        </div>
          {errors.password && <small className="invalid-feedback d-block">{errors.password.message}</small>}
          </div>
          {/* confirm password */}
          <div className="col-12">
            <div className="auth-input-group">
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
          )} type={`${showConfirmPassword ? "text" : "password"}`} className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}
          ${!errors.confirmPassword && watch("confirmPassword") ? "is-valid" : "" }`} aria-describedby='passwordelpBlock' placeholder="Confirm New Password"/>
          <span className='auth-icon'>
            <i style={{cursor:"pointer"}} onClick={()=> setShowConfirmPassword(!showConfirmPassword)} className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
          </span>
        </div>
          {errors.confirmPassword && <small className="invalid-feedback d-block">{errors.confirmPassword.message}</small>}
          </div>
        </div>
        <button className='btn btn-success auth-btn-colors w-100 mt-4' disabled={loading}>
          {loading ? (
            <span className="spinner-border spinner-border-sm me-2"></span>
          ) : "Reset Password"}
        </button>
      </form>
    </div>
  )
}
