import { Outlet } from "react-router-dom";
import SideBar from "../../modules/Shared/Components/SideBar/SideBarr";
import NavBar from "../../modules/Shared/Components/NavBar/NavBarr";

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
