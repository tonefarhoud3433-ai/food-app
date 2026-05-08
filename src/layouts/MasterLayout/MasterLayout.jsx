import { Outlet } from "react-router-dom";
import Header from "../../modules/Shared/Components/Header/Header";
import SideBar from "../../modules/Shared/Components/SideBar/SideBar";
import NavBar from "../../modules/Shared/Components/NavBar/NavBar";

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
