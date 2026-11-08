import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-gray-400 mt-10">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Logo */}
        <span className="text-white text-xl font-bold">
          M<span className="text-cyan-400">T</span>
        </span>

        {/* Links */}
        <div className="flex gap-6 text-sm">
          <Link to="/" className="hover:text-white transition-colors">Feed</Link>
          <Link to="/profile" className="hover:text-white transition-colors">Profile</Link>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} SocialApp. Graduation Project.
        </p>

      </div>
    </footer>
  )
}
