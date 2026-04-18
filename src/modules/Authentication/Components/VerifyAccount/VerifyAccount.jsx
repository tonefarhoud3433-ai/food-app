import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function VerifyAccount() {

  const navigate = useNavigate();

  let {register,handleSubmit,formState:{errors}}=useForm();


  const onSubmit=async(data)=>{
    try {
      const response = await axios.put("https://upskilling-egypt.com:3006/api/v1/Users/verify",data);
      const message = response?.data?.message || "Password reset successful";
      toast.success(message);
      navigate("/login");
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }

  

  return (
    <div>
      <div className="title my-4">
        <h3 className='auth-title'>Verify Account</h3>
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
          )} type="email" className="form-control" aria-describedby='emailelpBlock' placeholder="Enter your E-mail"/>
        </div>
          {errors.email && <span>{errors.email.message}</span>}
          <div className="auth-input-group mb-4">
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
          )} type="text" className="form-control" aria-describedby='otpelpBlock' placeholder="OTP"/>
        </div>
          {errors.code && <span>{errors.code.message}</span>}
        <button className='btn btn-success w-100'>Send</button>
      </form>
    </div>
  )
}
