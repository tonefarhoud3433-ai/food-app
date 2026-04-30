import userImg from "../../../../assets/images/common/avatar.png";
export default function NavBar({ loginData }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary m-3 rounded rounded-4">
        <div className="container-fluid d-flex justify-content-center align-items-center gap-4">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-3">
              <li
                className="nav-item position-relative avatar-bg"
                style={{ width: "40px" }}
              >
                <img
                  className="w-100 rounded-circle"
                  src={userImg}
                  alt="user image"
                />
              </li>
              <li className="nav-item fw-medium d-flex align-items-center gap-2">
                {loginData?.userName}
                <i className="fa-solid fa-chevron-down small"></i>
              </li>
              <li className="nav-item position-relative d-flex align-items-center justify-content-center">
                <i className="fa-solid fa-bell fs-5"></i>
                <span className="red-dot"></span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
