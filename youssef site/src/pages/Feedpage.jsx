import React, { useEffect, useState } from 'react'
import Postcard from '../component/Postcard'
import { getAllPostsapi } from '../services/Postserv'
import LoadingScreen from '../component/LoadingScreen'

export default function Feedpage() {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  async function getAllPosts() {
    setLoading(true)
    const response = await getAllPostsapi()
    // FIX: added safe check — response could be undefined if API crashes
    if (response && response.posts) {
      setPosts(response.posts)
    }
    setLoading(false)
  }

  useEffect(() => {
    getAllPosts();
  }, [])

  return (
    <>
      <div className="w-4/10 mx-auto">
        {loading
          ? <LoadingScreen />
          : posts.map((post) => <Postcard key={post._id} post={post} />)
        }
      </div>
    </>
  )
}
