import { Outlet, useLocation } from 'react-router-dom'
import logo from "../../assets/images/auth/logo.png"

export default function AuthLayout() {

  const location = useLocation();
  const isRegister = location.pathname === "/register"

  return (
    <>
      <div className={`auth-container ${isRegister ? "no-bg" : ""}`}>
        <div className="container-fluid bg-overlay">
          <div className="row min-vh-100 justify-content-center align-items-center">
            <div className={`col-11 ${isRegister ? "col-md-8 col-lg-6" : "col-md-8 col-lg-4"} bg-white rounded rounded-2 px-5 py-5`}>
              <div className="logo-container text-center">
                <img className={`${isRegister ? "auth-logo-size" : "w-75"}`} src={logo} alt="logo" />
              </div>
              <Outlet/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
