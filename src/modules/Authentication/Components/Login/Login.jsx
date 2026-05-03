import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthAPI } from "../../../../api";

export default function Login({ saveLoginData }) {
  const navigate = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onChange" });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await AuthAPI.login(data);
      localStorage.setItem("token", response.data.token);
      saveLoginData();
      toast.success("Logged Successfully");
      navigate("/dashboard");
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="title my-4">
        <h3 className="auth-title">Log In</h3>
        <span className="auth-subtitle">
          Welcome Back! Please enter your details
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-column gap-4">
          {/* email */}
          <div>
            <div className="auth-input-group">
              <span className="auth-icon">
                <i className="fa-solid fa-envelope"></i>
              </span>
              <div className="divider"></div>
              <input
                {...register("email", {
                  required: "Field is Required",
                  pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Email is not valid",
                  },
                })}
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}
          ${!errors.email && watch("email") ? "is-valid" : ""}`}
                aria-describedby="emailelpBlock"
                placeholder="Enter your E-mail"
              />
            </div>
            {errors.email && (
              <small className="invalid-feedback d-block">
                {errors.email.message}
              </small>
            )}
          </div>
          {/* password */}
          <div>
            <div className="auth-input-group">
              <span className="auth-icon">
                <i className="fa-solid fa-lock"></i>
              </span>
              <div className="divider"></div>
              <input
                {...register("password", {
                  required: "Field is Required",
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message:
                      "Password must contain uppercase, lowercase and number",
                  },
                })}
                type={`${showPassword ? "text" : "password"}`}
                className={`form-control ${errors.password ? "is-invalid" : ""}
          ${!errors.password && watch("password") ? "is-valid" : ""}`}
                aria-describedby="passwordelpBlock"
                placeholder="Password"
              />
              <span className="auth-icon">
                <i
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </span>
            </div>
            {errors.password && (
              <small className="invalid-feedback d-block">
                {errors.password.message}
              </small>
            )}
          </div>
        </div>
        <div className="links d-flex justify-content-between my-3">
          <Link className="text-muted text-decoration-none" to="/register">
            Register Now?
          </Link>
          <Link
            className="auth-links-colors text-decoration-none"
            to="/forget-pass"
          >
            Forget Password?
          </Link>
        </div>
        <button
          className="btn btn-success auth-btn-colors w-100"
          disabled={loading}
        >
          {loading ? (
            <span className="spinner-border spinner-border-sm me-2"></span>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}
