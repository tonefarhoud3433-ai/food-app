import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import logo from "../../../../assets/images/common/sidebar logo.png";

export default function SideBar({ setLoginData }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const navigate = useNavigate();
  const logout = () => {
    /*
    1-remove token from local storage
    2-null loginData
    3-navigate to login
    */
    localStorage.removeItem("token");
    setLoginData(null);
    navigate("/login");
  };

  return (
    <div className="sidebar-container">
      <Sidebar collapsed={isCollapsed}>
        <div onClick={() => toggleCollapse()} className="text-center my-5">
          <img src={logo} alt="logo" className="img-fluid" />
        </div>
        <Menu>
          <MenuItem
            icon={<i className="fa-regular fa-house" />}
            component={<Link to="/dashboard" />}
          >
            Home
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-users" />}
            component={<Link to="/dashboard/users" />}
          >
            Users
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-utensils" />}
            component={<Link to="/dashboard/recipes" />}
          >
            Recipes
          </MenuItem>
          <MenuItem
            icon={<i className="fa-regular fa-calendar-days" />}
            component={<Link to="/dashboard/categories" />}
          >
            Categories
          </MenuItem>
          <MenuItem
            icon={<i className="fa-regular fa-heart" />}
            component={<Link to="/dashboard/favorites" />}
          >
            Favorites
          </MenuItem>
          <MenuItem icon={<i className="fa-solid fa-unlock" />}>
            Change Password
          </MenuItem>
          <MenuItem
            icon={<i className="fa fa-sign-out" />}
            onClick={() => logout()}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
