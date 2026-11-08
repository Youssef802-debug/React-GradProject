import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Mainlayout from './layout/Mainlayout';
import Feedpage from './pages/Feedpage';
import Profilepage from './pages/Profilepage';
import Postdetails from './pages/Postdetails';
import Authlayout from './layout/Authlayout';
import Regester from './pages/Regester';
import Loginpage from './pages/Loginpage';
import Protectedroute from './layout/Protectedroute';
import Notfoundpage from './pages/Notfoundpage';
import Authnprotectedroute from './layout/Authnprotectedroute';
import RoomsPage from './pages/RoomsPage';
import RoomDetails from './pages/RoomDetails';
import CreatePost from './pages/CreatePost';
import MyPosts from './pages/MyPosts';

const router = createBrowserRouter([
  {
    path: '', element: <Mainlayout />, children: [
      { index: true,               element: <Protectedroute><Feedpage /></Protectedroute> },
      { path: 'profile',           element: <Protectedroute><Profilepage /></Protectedroute> },
      { path: 'post-details/:id',  element: <Protectedroute><Postdetails /></Protectedroute> },
      { path: 'rooms',             element: <Protectedroute><RoomsPage /></Protectedroute> },
      { path: 'rooms/:id',         element: <Protectedroute><RoomDetails /></Protectedroute> },
      { path: 'create-post',       element: <Protectedroute><CreatePost /></Protectedroute> },
      { path: 'my-posts',          element: <Protectedroute><MyPosts /></Protectedroute> },
      { path: '*',                 element: <Notfoundpage /> }
    ]
  },
  {
    path: '', element: <Authlayout />, children: [
      { path: 'regester', element: <Authnprotectedroute><Regester /></Authnprotectedroute> },
      { path: 'login',    element: <Authnprotectedroute><Loginpage /></Authnprotectedroute> }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
