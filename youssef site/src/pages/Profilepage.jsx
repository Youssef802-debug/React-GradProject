import React, { useState } from 'react'
import { MOCK_POSTS } from '../services/mockData'
import { Link } from 'react-router-dom'

export default function Profilepage() {
  const [activeTab, setActiveTab] = useState('posts')

  // ✅ Get the real logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{"name":"Ahmed Hassan","photo":"https://i.pravatar.cc/150?img=11","email":"ahmed@example.com","gender":"male"}')

  // ✅ Show only THIS user's posts
  const myPosts = MOCK_POSTS.filter(p => p.user.name === user.name)

  const STATS = [
    { label: 'Posts',     value: myPosts.length },
    { label: 'Followers', value: 0 },
 ]

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Cover Banner */}
      <div className="w-full h-48 bg-gradient-to-r from-blue-950 via-blue-800 to-cyan-600 relative">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-3xl mx-auto px-4">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md -mt-16 px-6 pt-6 pb-4">

          <img
            src={user.photo}
            alt={user.name}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg -mt-16 object-cover"
          />

          <div className="mt-3">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500 text-sm mt-1">
              Software engineering student 👨‍💻 · Cairo, Egypt 🇪🇬
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-5 border-t pt-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-bold text-blue-950">{stat.value}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-4 bg-white rounded-xl shadow-sm p-1">
          {['posts', 'about'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200
                ${activeTab === tab ? 'bg-blue-950 text-white shadow' : 'text-gray-500 hover:text-blue-950'}`}>
              {tab === 'posts' ? '📝 Posts' : '👤 About'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-4 mb-10">

          {/* Posts Tab */}
          {activeTab === 'posts' && (
            <div className="flex flex-col gap-4">
              {myPosts.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                  <p className="text-4xl mb-3">📝</p>
                  <p className="text-gray-400 text-sm">No posts yet.</p>
                  <Link to="/create-post"
                    className="inline-block mt-4 px-5 py-2 rounded-xl bg-blue-950 text-white text-sm font-semibold hover:bg-blue-800 transition-colors">
                    Create your first post
                  </Link>
                </div>
              ) : myPosts.map((post) => (
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
                        View Post →
                      </Link>
                    </div>
                    <p className="text-xs text-gray-300 mt-2">
                      {post.createdAt.split('.', 1).join().replace('T', ' ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
              {[
                { icon: '👤', label: 'Name',      value: user.name },
                { icon: '📧', label: 'Email',     value: user.email },
                { icon: '⚧',  label: 'Gender',    value: user.gender },
                { icon: '📍', label: 'Location',  value: 'Cairo, Egypt' },
                { icon: '🎓', label: 'Education', value: 'Software Engineering' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-sm border-b pb-3 last:border-0">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-gray-400 w-20">{item.label}</span>
                  <span className="text-gray-800 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
