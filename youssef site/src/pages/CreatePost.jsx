import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { MOCK_POSTS, MOCK_USERS } from '../services/mockData'

export default function CreatePost() {
  const navigate = useNavigate()
  const [body, setBody] = useState('')
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef()

  const user = JSON.parse(localStorage.getItem('user') || '{"name":"Ahmed Hassan","photo":"https://i.pravatar.cc/150?img=11"}')

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
    setImagePreview(URL.createObjectURL(file))
  }

  function handleRemoveImage() {
    setImage(null)
    setImagePreview(null)
    fileRef.current.value = ''
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!body.trim()) { setError('Post content cannot be empty'); return }

    setLoading(true)
    setError('')

    // Mock: add to MOCK_POSTS array for demo
    await new Promise(r => setTimeout(r, 600))

    const newPost = {
      _id: 'p' + Date.now(),
      id: 'p' + Date.now(),
      body: body.trim(),
      image: imagePreview || '',
      createdAt: new Date().toISOString(),
      user: { ...MOCK_USERS[0], name: user.name, photo: user.photo },
      likes: [],
      comments: [],
    }
    MOCK_POSTS.unshift(newPost)

    setLoading(false)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-12 px-4">
      <div className="w-full max-w-xl">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-blue-950">Create a Post</h1>
          <p className="text-gray-400 text-sm mt-1">Share something with the community</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">

          {/* User info */}
          <div className="flex items-center gap-3 mb-5">
            <img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
              <p className="text-xs text-gray-400">Posting to Feed</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Text area */}
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              placeholder={`What's on your mind, ${user.name.split(' ')[0]}?`}
              rows={4}
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800
                focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300"
            />

            {/* Image Preview */}
            {imagePreview && (
              <div className="relative rounded-xl overflow-hidden">
                <img src={imagePreview} alt="preview" className="w-full max-h-64 object-cover" />
                <button type="button" onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs hover:bg-opacity-80">
                  ✕
                </button>
              </div>
            )}

            {/* Error */}
            {error && <p className="text-red-500 text-xs">{error}</p>}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">

              {/* Upload image button */}
              <button type="button" onClick={() => fileRef.current.click()}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                Add Photo
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="px-6 py-2 rounded-xl bg-blue-950 text-white text-sm font-semibold
                  hover:bg-blue-800 transition-colors disabled:opacity-60">
                {loading ? 'Posting...' : 'Post 🚀'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
