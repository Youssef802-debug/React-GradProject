import React from 'react'
import { Link } from 'react-router-dom'
import { MOCK_POSTS } from '../services/mockData'

export default function MyPosts() {
  const user = JSON.parse(localStorage.getItem('user') || '{"name":"Ahmed Hassan","photo":"https://i.pravatar.cc/150?img=11"}')

  const myPosts = MOCK_POSTS.filter(p => p.user.name === user.name)

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto">

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-blue-950">My Posts</h1>
          <p className="text-gray-400 text-sm mt-1">{myPosts.length} post{myPosts.length !== 1 ? 's' : ''} by {user.name}</p>
        </div>

        {myPosts.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <p className="text-4xl mb-3">📝</p>
            <p className="text-gray-400 text-sm">You haven't posted anything yet.</p>
            <Link to="/create-post"
              className="inline-block mt-4 px-5 py-2 rounded-xl bg-blue-950 text-white text-sm font-semibold hover:bg-blue-800 transition-colors">
              Create your first post
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {myPosts.map(post => (
            <div key={post._id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {post.image && <img src={post.image} alt="" className="w-full h-48 object-cover" />}
              <div className="p-4">
                <p className="text-gray-800 text-sm">{post.body}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex gap-4 text-xs text-gray-400">
                    <span>❤️ {post.likes.length} likes</span>
                    <span>💬 {post.comments.length} comments</span>
                  </div>
                  <Link to={`/post-details/${post._id}`}
                    className="text-xs text-blue-600 hover:underline font-medium">
                    View →
                  </Link>
                </div>
                <p className="text-xs text-gray-300 mt-2">
                  {post.createdAt.split('.', 1).join().replace('T', ' ')}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
