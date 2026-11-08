import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

export default function Protectedroute({children}) {
  
 const [isLoggedIn , setLoggedIn] = useState(localStorage.getItem('token')!= null)
  console.log(isLoggedIn);
  

  return isLoggedIn? children : <Navigate to={'/login'} /> 
}
