import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSingelPostsapi } from '../services/Postserv'
import Postcard from './../component/Postcard';
import LoadingScreen from './../component/LoadingScreen';

export default function Postdetails() {

  // FIX 1: useParams was missing () — it's a function call, not a value
  const { id } = useParams()

  const [post, setPost] = useState(null)

  // FIX 2: useEffect was inside getPost() — moved it outside
  async function getPost() {
    const responce = await getSingelPostsapi(id);
    if (responce.message) {
      setPost(responce.post)
    }
  }

  useEffect(() => {
    getPost();
  }, [])

  return (
    <>
      <div className="w-4/6 mx-auto">
        {post ? <Postcard post={post} /> : <LoadingScreen />}
      </div>
    </>
  )
}
