import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

export default function Authnprotectedroute({children}) {

const [isLoggedIn , setLoggedIn] = useState(localStorage.getItem('token')!= null)
  console.log(isLoggedIn);
  

  return !isLoggedIn?  children : <Navigate to={'/'} /> 
}
