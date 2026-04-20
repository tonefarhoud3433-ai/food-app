import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Sidebar({setLoginData}) {

  const navigate = useNavigate()
  const logout=()=>{
    /*
    1-remove token from local storage
    2-null loginData
    3-navigate to login
    */
    localStorage.removeItem("token");
    setLoginData(null)
    navigate("/login")

  }

  return (
    <div className='bg-info'>
      <h2>Sidebar</h2>
      <button className='btn btn-primary' onClick={()=> logout()}>log out</button>
    </div>
  )
}
