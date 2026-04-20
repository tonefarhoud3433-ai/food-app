import { Outlet } from 'react-router-dom'
import Header from '../../modules/Shared/Components/Header/Header'
import Navbar from '../../modules/Shared/Components/NavBar/Navbar'
import Sidebar from '../../modules/Shared/Components/Sidebar/Sidebar'

export default function MasterLayout({loginData , setLoginData}) {
  return (
    <div className='d-flex'>
      <Sidebar setLoginData={setLoginData}/>
      <div className='w-100'>
        <Navbar loginData={loginData}/>
        <Header/>
        <Outlet/>
      </div>
    </div>
  )
}
