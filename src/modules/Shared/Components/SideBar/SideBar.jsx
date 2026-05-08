import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import logo from "../../../../assets/images/common/sidebar logo.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ChangePass from "../../../Authentication/Components/ChangePass/ChangePass";
import { AuthContext } from "../../../../context/AuthContext";
import logoutImage from "../../../../assets/images/common/no-data.png";

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleLogoutClose = () => setShowLogoutModal(false);
  const handleLogoutShow = () => setShowLogoutModal(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const { setLoginData, loginData } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setLoginData(null);
    navigate("/login");
  };

  return (
    <div className="sidebar-container">
      <Modal show={showModal} onHide={handleClose} centered size="md">
        <Modal.Body className="p-0">
          <ChangePass handleClose={handleClose} />
        </Modal.Body>
      </Modal>

      <Modal show={showLogoutModal} onHide={handleLogoutClose} centered>
        <Modal.Body className="text-center p-4">
          <div className="mb-3">
            <img src={logoutImage} alt="logout" style={{ width: "150px" }} />
          </div>
          <h5 className="fw-bold">Log Out?</h5>
          <p className="text-muted">Are you sure you want to log out?</p>
          <div className="d-flex justify-content-center gap-2 mt-4">
            <Button
              variant="outline-danger"
              className="px-4"
              onClick={handleLogoutClose}
            >
              Cancel
            </Button>
            <Button variant="danger" className="px-4" onClick={logout}>
              Log Out
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Sidebar collapsed={isCollapsed}>
        <div
          onClick={() => toggleCollapse()}
          className="text-center my-5 cursor-pointer"
        >
          <img src={logo} alt="logo" className="img-fluid" />
        </div>
        <Menu>
          <MenuItem
            icon={<i className="fa-regular fa-house" />}
            component={<Link to="/dashboard" />}
          >
            Home
          </MenuItem>

          {loginData?.userGroup !== "SystemUser" && (
            <MenuItem
              icon={<i className="fa-solid fa-users" />}
              component={<Link to="/dashboard/users" />}
            >
              Users
            </MenuItem>
          )}

          <MenuItem
            icon={<i className="fa-solid fa-utensils" />}
            component={<Link to="/dashboard/recipes" />}
          >
            Recipes
          </MenuItem>

          {loginData?.userGroup !== "SystemUser" && (
            <MenuItem
              icon={<i className="fa-regular fa-calendar-days" />}
              component={<Link to="/dashboard/categories" />}
            >
              Categories
            </MenuItem>
          )}

          {loginData?.userGroup === "SystemUser" && (
            <MenuItem
              icon={<i className="fa-regular fa-heart" />}
              component={<Link to="/dashboard/favorites" />}
            >
              Favorites
            </MenuItem>
          )}

          <MenuItem
            onClick={handleShow}
            icon={<i className="fa-solid fa-unlock" />}
          >
            Change Password
          </MenuItem>

          <MenuItem
            icon={<i className="fa fa-sign-out" />}
            onClick={handleLogoutShow}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
