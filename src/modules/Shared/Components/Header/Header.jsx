import React from "react";

export default function Header({ title, desc, imgUrl, imgClass }) {
  return (
    <div className="py-5 py-lg-2 px-md-5 m-3 text-white rounded rounded-4 header-bg d-flex justify-content-center align-items-center">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 d-flex align-items-center justify-content-center justify-content-lg-start">
            <div className="text-center text-md-start">
              <h3>{title}</h3>
              <p className="py-3">{desc}</p>
            </div>
          </div>
          <div className="col-md-4 text-center text-md-end">
            <img className={imgClass} src={imgUrl} alt="header photo" />
          </div>
        </div>
      </div>
    </div>
  );
}
