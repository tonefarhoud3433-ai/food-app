import React from "react";
import { useNavigate } from "react-router-dom";
import notFoundImg from "../../../../assets/images/not-found/bg1.png";
import logo from "../../../../assets/images/not-found/logo.png";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-bg vh-100 d-flex flex-column justify-content-between p-4 p-md-5 position-relative overflow-hidden">
      <div className="logo-container" style={{ zIndex: 10 }}>
        <img src={logo} alt="logo" />
      </div>

      <div className="d-flex align-items-center align-items-md-end justify-content-between h-100">
        <div
          className="content-container mb-md-5 text-center text-md-start w-100"
          style={{ zIndex: 5 }}
        >
          <h1 className="fw-bold display-2">Oops.</h1>
          <h2 className="text-success fw-normal">Page not found</h2>
          <p className="text-muted fs-5 my-4">
            This page doesn’t exist or was removed!{" "}
            <br className="d-none d-md-block" />
            We suggest you back to home.
          </p>
          <button
            className="btn btn-success px-5 py-3 shadow-sm border-0"
            onClick={() => navigate("/dashboard")}
          >
            <i className="fas fa-arrow-left me-3"></i>
            Back To Home
          </button>
        </div>

        <div className="image-wrapper-mobile">
          <img src={notFoundImg} alt="not found" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}
