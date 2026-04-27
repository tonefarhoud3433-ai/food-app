import { Outlet } from "react-router-dom";
import Header from "../../modules/Shared/Components/Header/Header";
import Navbar from "../../modules/Shared/Components/Navbar/Navbar";
import Sidebar from "../../modules/Shared/Components/Sidebar/Sidebar";

export default function MasterLayout({ loginData, setLoginData }) {
  return (
    <div className="d-flex">
      <div className="w-25">
        <Sidebar setLoginData={setLoginData} />
      </div>
      <div className="w-100">
        <Navbar loginData={loginData} />
        <Outlet />
      </div>
    </div>
  );
}
