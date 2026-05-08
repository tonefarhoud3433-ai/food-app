import React, { useState } from "react";
import logo from "../../../../assets/images/common/sidebar logo.png";
import { useForm } from "react-hook-form";
import { AuthAPI } from "../../../../api";
import { toast } from "react-toastify";

export default function ChangePass({ handleClose }) {
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await AuthAPI.change(data);
      toast.success("Password changed successfully");

      handleClose();
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 text-center">
      <img src={logo} alt="logo" className="w-50 mb-3" />
      <h5 className="fw-bold text-start">Change Your Password</h5>
      <p className="text-muted text-start">Enter your details below</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="input-group my-3">
            <div className="col-12">
              <div className="auth-input-group">
                <span className="auth-icon">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <div className="divider"></div>
                <input
                  {...register("oldPassword", {
                    required: "Field is Required",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                      message:
                        "Min 8 chars, 1 uppercase, 1 lowercase, 1 number , 1 special character",
                    },
                  })}
                  type={`${showOldPassword ? "text" : "password"}`}
                  className={`form-control ${errors.oldPassword ? "is-invalid" : ""}
          ${!errors.oldPassword && watch("oldPassword") ? "is-valid" : ""}`}
                  aria-describedby="oldPasswordelpBlock"
                  placeholder="Old Password"
                />
                <span className="auth-icon">
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className={`fa ${showOldPassword ? "fa-eye-slash" : "fa-eye"}`}
                  ></i>
                </span>
              </div>
              {errors.oldPassword && (
                <small className="invalid-feedback d-block">
                  {errors.oldPassword.message}
                </small>
              )}
            </div>
          </div>

          <div className="input-group my-3">
            <div className="col-12">
              <div className="auth-input-group">
                <span className="auth-icon">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <div className="divider"></div>
                <input
                  {...register("newPassword", {
                    required: "Field is Required",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                      message:
                        "Min 8 chars, 1 uppercase, 1 lowercase, 1 number , 1 special character",
                    },
                  })}
                  type={`${showNewPassword ? "text" : "password"}`}
                  className={`form-control ${errors.newPassword ? "is-invalid" : ""}
          ${!errors.newPassword && watch("newPassword") ? "is-valid" : ""}`}
                  aria-describedby="newPasswordelpBlock"
                  placeholder="New Password"
                />
                <span className="auth-icon">
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className={`fa ${showNewPassword ? "fa-eye-slash" : "fa-eye"}`}
                  ></i>
                </span>
              </div>
              {errors.newPassword && (
                <small className="invalid-feedback d-block">
                  {errors.newPassword.message}
                </small>
              )}
            </div>
          </div>

          <div className="input-group">
            {/* confirm password */}
            <div className="col-12">
              <div className="auth-input-group">
                <span className="auth-icon">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <div className="divider"></div>
                <input
                  {...register("confirmNewPassword", {
                    required: "Field is Required",
                    validate: (val) => {
                      if (getValues("newPassword") !== val) {
                        return "Your passwords do not match";
                      }
                    },
                  })}
                  type={`${showConfirmPassword ? "text" : "password"}`}
                  className={`form-control ${errors.confirmNewPassword ? "is-invalid" : ""}
          ${!errors.confirmNewPassword && watch("confirmNewPassword") ? "is-valid" : ""}`}
                  aria-describedby="confirmNewPasswordelpBlock"
                  placeholder="Confirm New Password"
                />
                <span className="auth-icon">
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
                  ></i>
                </span>
              </div>
              {errors.confirmNewPassword && (
                <small className="invalid-feedback d-block">
                  {errors.confirmNewPassword.message}
                </small>
              )}
            </div>
          </div>
        </div>

        <button
          className="btn btn-success auth-btn-colors w-100 my-3"
          disabled={loading}
        >
          {loading ? (
            <span className="spinner-border spinner-border-sm me-2"></span>
          ) : (
            "Change Password"
          )}
        </button>
      </form>
    </div>
  );
}
