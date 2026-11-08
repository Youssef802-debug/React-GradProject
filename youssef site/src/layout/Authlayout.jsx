import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Authlayout() {
  return (
    <>

    <div className=" min-h-screen flex justify-center items-center bg-blue-950">

      <Outlet/> 

       
    </div>


    </>
  )
}
