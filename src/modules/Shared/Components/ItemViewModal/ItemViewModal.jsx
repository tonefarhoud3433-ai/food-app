import React from "react";
import { Modal } from "react-bootstrap";
import noDataImage from "../../../../assets/images/common/no-data.png";

export default function ItemViewModal({
  show,
  handleClose,
  data,
  title = "Details",
  onAddToFav,
}) {
  if (!data) return null;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="md"
      centered
      className="view-modal"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold fs-5 text-success">{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 pb-4">
        <div className="text-center mb-4">
          <img
            src={
              data.imagePath
                ? `https://upskilling-egypt.com:3006/${data.imagePath}`
                : noDataImage
            }
            alt="item"
            className="rounded-3 shadow-sm border"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
          <h4 className="mt-3 fw-bold mb-0">{data.name || data.userName}</h4>

          <div className="d-flex justify-content-center align-items-center gap-2 mt-2">
            <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
              {data.tag?.name || (data.email ? "User" : "Item")}
            </span>

            {/* زرار الـ Favorite يظهر فقط إذا كانت الـ function ممررة */}
            {onAddToFav && (
              <button
                onClick={() => onAddToFav(data.id)}
                className="btn btn-outline-danger rounded-pill px-3 py-1 btn-sm shadow-sm"
                style={{ fontSize: "0.8rem", borderStyle: "dashed" }}
              >
                <i className="fa-solid fa-heart me-1"></i> Add to Fav
              </button>
            )}
          </div>
        </div>

        <hr className="text-muted opacity-25" />

        <div className="info-list">
          <div className="d-flex justify-content-between py-2 border-bottom border-light">
            <span className="text-muted">
              <i className="fa-solid fa-hashtag me-2"></i> ID:
            </span>
            <span className="fw-medium text-dark">{data.id}</span>
          </div>

          {data.price && (
            <div className="d-flex justify-content-between py-2 border-bottom border-light">
              <span className="text-muted">
                <i className="fa-solid fa-money-bill-wave me-2"></i> Price:
              </span>
              <span className="fw-medium text-dark">{data.price} EGP</span>
            </div>
          )}

          {data.email && (
            <div className="d-flex justify-content-between py-2 border-bottom border-light">
              <span className="text-muted">
                <i className="fa-solid fa-envelope me-2"></i> Email:
              </span>
              <span className="fw-medium text-dark small">{data.email}</span>
            </div>
          )}

          <div className="d-flex justify-content-between py-2 border-bottom border-light">
            <span className="text-muted">
              <i className="fa-solid fa-calendar me-2"></i> Created At:
            </span>
            <span className="fw-medium text-dark">
              {new Date(
                data.creationDate || data.createdAt,
              ).toLocaleDateString()}
            </span>
          </div>

          {data.description && (
            <div className="mt-3">
              <span className="text-muted d-block mb-1">
                <i className="fa-solid fa-align-left me-2"></i> Description:
              </span>
              <p className="bg-light p-2 rounded small text-secondary mb-0">
                {data.description}
              </p>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
