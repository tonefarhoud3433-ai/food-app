import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip'


export default function Register() {

  const navigate = useNavigate();

  let {register,handleSubmit,formState:{errors},getValues,watch}=useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit=async(data)=>{
    try {
      setLoading(true)
      const response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Register",data);
      const message = response?.data?.message || "Registered successfully";
      toast.success(message);
      navigate("/verify-acc");
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
        <h3 className='auth-title'>Register</h3>
        <span className='auth-subtitle'>Welcome Back! Please enter your details</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row gy-2 gy-lg-3 gx-3 gx-lg-5">
        {/* user name */}
        <div className="col-12 col-md-6">
            <div className="auth-input-group mb-1 mb-md-4">
              <span className='auth-icon'>
                <i className="fa-solid fa-user"></i>
              </span>
              <div className="divider"></div>
              <input {...register("userName",
                {required:"Field is Required",
                  pattern :{
                    value:/^[a-zA-Z0-9]([a-zA-Z0-9 _-]{2,7})[a-zA-Z0-9]$/,
                    message: "user must be 4-9 characters (includes special character and number - optional)"
                  }
                }
              )} data-tooltip-id='user-tooltip' type="text" className={`form-control ${errors.userName ? "is-invalid" : ""}
          ${!errors.userName && watch("userName") ? "is-valid" : "" }`} aria-describedby='userNameelpBlock' placeholder="userName"/>
            </div>
          {errors.userName && <Tooltip id='user-tooltip' place='top' defaultIsOpen>{errors.userName.message}</Tooltip>}
          </div>
        {/* email */}
        <div className="col-12 col-md-6">
            <div className="auth-input-group mb-1 mb-md-4">
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
          </div>
          {/* country */}
        <div className="col-12 col-md-6">
            <div className="auth-input-group mb-1 mb-md-4">
              <span className='auth-icon'>
                <i className="fa-solid fa-earth-europe"></i>
              </span>
              <div className="divider"></div>
              <input {...register("country",
                {required:"Field is Required",
                  pattern : {
                    value : /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,
                    message: "Enter a valid country name (letters only, no spaces at start or end)"
                  }
                }
              )} data-tooltip-id='country-tooltip' type="text" className={`form-control ${errors.country ? "is-invalid" : ""}
          ${!errors.country && watch("country") ? "is-valid" : "" }`} aria-describedby='countryelpBlock' placeholder="country "/>
            </div>
          {errors.country && <Tooltip id='country-tooltip' place='top' defaultIsOpen>{errors.country.message}</Tooltip>}
          </div>
          {/* phone number */}
        <div className="col-12 col-md-6">
            <div className="auth-input-group mb-1 mb-md-4">
              <span className='auth-icon'>
                <i className="fa-solid fa-mobile-screen-button"></i>
              </span>
              <div className="divider"></div>
              <input {...register("phoneNumber",
                {required:"Field is Required",
                }
              )} data-tooltip-id='phone-tooltip' type="text" className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}
          ${!errors.phoneNumber && watch("phoneNumber") ? "is-valid" : "" }`} aria-describedby='phoneNumberelpBlock' placeholder="phoneNumber "/>
            </div>
          {errors.phoneNumber && <Tooltip id='phone-tooltip' place='top' defaultIsOpen>{errors.phoneNumber.message}</Tooltip>}
          </div>
          {/* password */}
          <div className="col-12 col-md-6">
            <div className="auth-input-group mb-1 mb-md-4">
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
          ${!errors.password && watch("password") ? "is-valid" : "" }`} aria-describedby='passwordelpBlock' placeholder="Password"/>
        </div>
          {errors.password && <Tooltip id='pass-tooltip' place='top' defaultIsOpen>{errors.password.message}</Tooltip>}
          </div>
          {/* confirm password */}
          <div className="col-12 col-md-6">
            <div className="auth-input-group mb-1 mb-md-4">
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
          ${!errors.confirmPassword && watch("confirmPassword") ? "is-valid" : "" }`} aria-describedby='passwordelpBlock' placeholder="Confirm Password"/>
        </div>
          {errors.confirmPassword && <Tooltip id='confirm-tooltip' place='top' defaultIsOpen>{errors.confirmPassword.message}</Tooltip>}
          </div>
        </div>
        <div className="links d-flex justify-content-end my-2 my-md-3">
          <Link className='text-decoration-none auth-links-colors' to="/login">Login Now?</Link>
        </div>
        <div className="text-center">
            <button className='btn btn-success auth-btn-colors w-75' disabled={loading}>
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2"></span>
              ) : "Register"}
            </button>
        </div>
      </form>
    </div>
  )
}
