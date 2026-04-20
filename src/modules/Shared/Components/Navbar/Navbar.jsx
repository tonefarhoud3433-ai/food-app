import React from 'react'

export default function Navbar({loginData}) {
  return (
    <>
    <h1>Navbar</h1>
    <h2>{loginData?.userName}</h2>
    </>
  )
}
