import axios from 'axios';
import { useState } from 'react';
import { useForm} from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip'

export default function Login() {

  const navigate = useNavigate();

  let {register,handleSubmit,formState:{errors},watch}=useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit=async(data)=>{
    try {
      setLoading(true)
      const response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Login",data);
      localStorage.setItem("token",response.data.token);
      toast.success("Logged Successfully");
      navigate("/dashboard");
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
        <h3 className='auth-title'>Log In</h3>
        <span className='auth-subtitle'>Welcome Back! Please enter your details</span>
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
          {errors.email && <Tooltip id='email-tooltip' place='top'>{errors.email.message}</Tooltip>}
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
          )} type="password" data-tooltip-id='password-tooltip' className={`form-control ${errors.password ? "is-invalid" : ""}
          ${!errors.password && watch("password") ? "is-valid" : "" }`} aria-describedby='passwordelpBlock' placeholder="Password"/>
        </div>
          {errors.password && <Tooltip id='password-tooltip' place='top'>{errors.password.message}</Tooltip>}
        <div className="links d-flex justify-content-between my-3">
          <Link className='text-muted text-decoration-none' to="/register">Register Now?</Link>
          <Link className='auth-links-colors text-decoration-none' to="/forget-pass">Forget Password?</Link>
        </div>
        <button className='btn btn-success auth-btn-colors w-100' disabled={loading}>
          {loading ? (
            <span className="spinner-border spinner-border-sm me-2"></span>
          ): "Login"}
        </button>
      </form>
    </div>
  )
}
