import { Outlet } from 'react-router-dom'
import Header from '../../modules/Shared/Components/Header/Header'
import Navbar from '../../modules/Shared/Components/NavBar/NavBar'
import Sidebar from '../../modules/Shared/Components/Sidebar/SideBar'

export default function MasterLayout() {
  return (
    <div className='d-flex'>
      <Sidebar/>
      <div className='w-100'>
        <Navbar/>
        <Header/>
        <Outlet/>
      </div>
    </div>
  )
}
