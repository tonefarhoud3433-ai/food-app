import { Outlet } from "react-router-dom";
import Header from "../../modules/Shared/Components/Header/Header";
import NavBar from "../../modules/Shared/Components/Navbar/NavBar";
import SideBar from "../../modules/Shared/Components/Sidebar/SideBar";

export default function MasterLayout() {
  return (
    <div className="d-flex vh-100 overflow-hidden">
      <div>
        <SideBar />
      </div>
      <div className="w-100 overflow-auto">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
}
