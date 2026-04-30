import { Outlet } from "react-router-dom";
import Header from "../../modules/Shared/Components/Header/Header";
import NavBar from "../../modules/Shared/Components/Navbar/NavBar";
import SideBar from "../../modules/Shared/Components/Sidebar/SideBar";

export default function MasterLayout({ loginData, setLoginData }) {
  return (
    <div className="d-flex ">
      <div>
        <SideBar setLoginData={setLoginData} />
      </div>
      <div className="w-100">
        <NavBar loginData={loginData} />
        <Outlet />
      </div>
    </div>
  );
}
