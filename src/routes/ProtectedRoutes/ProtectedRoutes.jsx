import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function ProtectedRoutes({ children, allowedRoles }) {
  const { loginData, isLoading } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  if (isLoading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-success" role="status"></div>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(loginData?.userGroup)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}
