import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {

  const navigate = useNavigate();

  let {register,handleSubmit,formState:{errors}}=useForm();

  const onSubmit=async(data)=>{
    try {
      const response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Login",data);
      localStorage.setItem("token",response.data.token);
      toast.success("Logged Successfully");
      navigate("/dashboard");
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
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
            <i className="fa-solid fa-mobile-screen-button"></i>
          </span>
          <div className="divider"></div>
          <input {...register("email",
            {required:"Field is Required",
            pattern:{
              value:/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message:"Email is not valid"
            }
            }
          )} type="email" className="form-control" aria-describedby='emailelpBlock' placeholder="Enter your E-mail"/>
        </div>
          {errors.email && <span>{errors.email.message}</span>}
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
          )} type="password" className="form-control" aria-describedby='passwordelpBlock' placeholder="Password"/>
        </div>
          {errors.password && <span>{errors.password.message}</span>}
        <div className="links d-flex justify-content-between my-3">
          <Link className='text-muted text-decoration-none' to="/register">Register Now?</Link>
          <Link className='text-success text-decoration-none' to="/forget-pass">Forget Password?</Link>
        </div>
        <button className='btn btn-success w-100'>Login</button>
      </form>
    </div>
  )
}
