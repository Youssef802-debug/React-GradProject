import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Get user name from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{"name":"Ahmed Hassan","photo":"https://i.pravatar.cc/150?img=11"}')

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/')

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-blue-950 shadow-lg mt-1.5 w-3/4 rounded-4xl mx-auto hover:w-11/12 duration-1000">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold tracking-tight">
         M<span className="text-cyan-400">T</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-2">

          {/* Feed */}
          <Link to="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${location.pathname === '/' ? 'bg-cyan-500 text-white' : 'text-gray-300 hover:bg-blue-800 hover:text-white'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Feed
          </Link>

          {/* Join Room */}
          <Link to="/rooms"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${isActive('/rooms') ? 'bg-cyan-500 text-white' : 'text-white bg-cyan-700 hover:bg-cyan-600'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Join Room
          </Link>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-blue-800 hover:text-white transition-all duration-200"
            >
              <img src={user.photo} alt={user.name}
                className="w-7 h-7 rounded-full object-cover border-2 border-cyan-400" />
              <span className="max-w-[100px] truncate">{user.name}</span>
              {/* Chevron */}
              <svg className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">

                {/* User info header */}
                <div className="px-4 py-3 bg-blue-50 border-b border-gray-100">
                  <p className="text-xs text-gray-400">Logged in as</p>
                  <p className="text-sm font-semibold text-blue-950 truncate">{user.name}</p>
                </div>

                {/* Create Post */}
                <Link to="/create-post"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors">
                  <span className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </span>
                  Create Post
                </Link>

                {/* My Posts */}
                <Link to="/my-posts"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors">
                  <span className="w-7 h-7 rounded-lg bg-cyan-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                    </svg>
                  </span>
                  My Posts
                </Link>

                {/* Profile */}
                <Link to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors">
                  <span className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  </span>
                  Profile
                </Link>

                <div className="border-t border-gray-100" />

                {/* Logout */}
                <button onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors">
                  <span className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                  </span>
                  Logout
                </button>

              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  )
}
