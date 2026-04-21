import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function Register() {

  const navigate = useNavigate();

  let {register,handleSubmit,formState:{errors},getValues,watch}=useForm({mode:"onChange"});

  const [loading, setLoading] = useState(false);
  const [showPassword,setShowPassword]= useState(false);
  const [showConfirmPassword,setShowConfirmPassword]= useState(false);

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
        <div className="row gy-2 gy-lg-4 gx-3 gx-lg-5">
        {/* user name */}
        <div className="col-12 col-md-6">
            <div className="auth-input-group ">
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
              )} type="text" className={`form-control ${errors.userName ? "is-invalid" : ""}
          ${!errors.userName && watch("userName") ? "is-valid" : "" }`} aria-describedby='userNameelpBlock' placeholder="userName"/>
            </div>
          {errors.userName && <small className="invalid-feedback d-block">{errors.userName.message}</small>}
          </div>
        {/* email */}
        <div className="col-12 col-md-6">
            <div className="auth-input-group ">
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
          {/* country */}
        <div className="col-12 col-md-6">
            <div className="auth-input-group ">
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
              )} type="text" className={`form-control ${errors.country ? "is-invalid" : ""}
          ${!errors.country && watch("country") ? "is-valid" : "" }`} aria-describedby='countryelpBlock' placeholder="country "/>
            </div>
          {errors.country && <small className="invalid-feedback d-block">{errors.country.message}</small>}
          </div>
          {/* phone number */}
        <div className="col-12 col-md-6">
            <div className="auth-input-group ">
              <span className='auth-icon'>
                <i className="fa-solid fa-mobile-screen-button"></i>
              </span>
              <div className="divider"></div>
              <input {...register("phoneNumber",
                {required:"Field is Required",
                }
              )} type="text" className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}
          ${!errors.phoneNumber && watch("phoneNumber") ? "is-valid" : "" }`} aria-describedby='phoneNumberelpBlock' placeholder="phoneNumber "/>
            </div>
          {errors.phoneNumber && <small className="invalid-feedback d-block">{errors.phoneNumber.message}</small>}
          </div>
          {/* password */}
          <div className="col-12 col-md-6">
            <div className="auth-input-group ">
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
          ${!errors.password && watch("password") ? "is-valid" : "" }`} aria-describedby='passwordelpBlock' placeholder="Password"/>
          <span className='auth-icon'>
            <i style={{cursor:"pointer"}} onClick={()=> setShowPassword(!showPassword)} className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
          </span>
        </div>
          {errors.password && <small className="invalid-feedback d-block">{errors.password.message}</small>}
          </div>
          {/* confirm password */}
          <div className="col-12 col-md-6">
            <div className="auth-input-group ">
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
          ${!errors.confirmPassword && watch("confirmPassword") ? "is-valid" : "" }`} aria-describedby='passwordelpBlock' placeholder="Confirm Password"/>
          <span className='auth-icon'>
            <i style={{cursor:"pointer"}} onClick={()=> setShowConfirmPassword(!showConfirmPassword)} className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
          </span>
        </div>
          {errors.confirmPassword && <small className="invalid-feedback d-block">{errors.confirmPassword.message}</small>}
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
