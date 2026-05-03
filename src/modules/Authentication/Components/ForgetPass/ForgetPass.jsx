import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthAPI } from "../../../../api";
export default function ForgetPass() {
  const navigate = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onChange" });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await AuthAPI.forget(data);
      const message = response?.data?.message || "Email sent successfully";
      toast.success(message);
      navigate("/reset-pass");
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
        <h3 className="auth-title">Forgot Your Password?</h3>
        <span className="auth-subtitle">
          No worries! Please enter your email and we will send a password reset
          link
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* email */}
        <div className="mb-4">
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
        <button
          className="btn btn-success auth-btn-colors w-100"
          disabled={loading}
        >
          {loading ? (
            <span className="spinner-border spinner-border-sm me-2"></span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}
