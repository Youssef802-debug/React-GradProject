import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ROOMS = [
  {
    id: "r1",
    name: "Anxiety & Stress Relief",
    description: "A safe space to talk about anxiety, panic attacks, and daily stress. Share coping strategies and support each other through tough moments.",
    topic: "Anxiety",
    members: 34,
    host: "Dr. Sara Mohamed",
    hostPhoto: "https://i.pravatar.cc/150?img=47",
    emoji: "🧘",
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: "r2",
    name: "Depression Support Circle",
    description: "An open and judgment-free room for those dealing with depression. You are not alone — come talk, listen, and heal together.",
    topic: "Depression",
    members: 52,
    host: "Ahmed Hassan",
    hostPhoto: "https://i.pravatar.cc/150?img=11",
    emoji: "💙",
    color: "from-indigo-500 to-blue-400",
  },
  {
    id: "r3",
    name: "Self-Esteem & Confidence",
    description: "Building a healthier relationship with yourself. Discuss self-worth, negative self-talk, and how to grow into a more confident you.",
    topic: "Self-Esteem",
    members: 28,
    host: "Nour Ali",
    hostPhoto: "https://i.pravatar.cc/150?img=56",
    emoji: "🌱",
    color: "from-emerald-500 to-teal-400",
  },
  {
    id: "r4",
    name: "Trauma & Recovery",
    description: "A gentle room for those healing from past trauma. Share your journey at your own pace in a compassionate, respectful environment.",
    topic: "Trauma",
    members: 19,
    host: "Omar Khaled",
    hostPhoto: "https://i.pravatar.cc/150?img=33",
    emoji: "🕊️",
    color: "from-purple-500 to-pink-400",
  },
  {
    id: "r5",
    name: "Mindfulness & Meditation",
    description: "Learn and practice mindfulness techniques together. Daily check-ins, breathing exercises, and guided meditation discussions.",
    topic: "Mindfulness",
    members: 41,
    host: "Dr. Sara Mohamed",
    hostPhoto: "https://i.pravatar.cc/150?img=47",
    emoji: "🌸",
    color: "from-rose-400 to-orange-300",
  },
  {
    id: "r6",
    name: "OCD Awareness",
    description: "Understanding and managing OCD together. Share experiences, treatment progress, and encourage each other on the road to recovery.",
    topic: "OCD",
    members: 15,
    host: "Ahmed Hassan",
    hostPhoto: "https://i.pravatar.cc/150?img=11",
    emoji: "🔄",
    color: "from-yellow-500 to-amber-400",
  },
]

export default function RoomsPage() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filtered = ROOMS.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.topic.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-800 to-cyan-700 py-12 px-6 text-center min-h-full">
        <h1 className="text-4xl font-bold text-white mb-2">Support Rooms 💬</h1>
        <p className="text-cyan-200 text-sm max-w-md mx-auto">
          Join a room, share your thoughts, and connect with others on their mental health journey.
        </p>
        {/* Search */}
        <div className="mt-6 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search rooms..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm text-gray-800 bg-white shadow-md outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(room => (
          <div key={room.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col">

            {/* Colored top bar */}
            <div className={`h-2 w-full bg-gradient-to-r ${room.color}`} />

            <div className="p-5 flex flex-col flex-1">

              {/* Emoji + Name */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{room.emoji}</span>
                <div>
                  <h2 className="font-bold text-gray-900 text-base leading-tight">{room.name}</h2>
                  <span className="text-xs text-cyan-600 font-medium bg-cyan-50 px-2 py-0.5 rounded-full">
                    {room.topic}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed flex-1">{room.description}</p>

              {/* Host + Members */}
              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={room.hostPhoto} alt={room.host}
                    className="w-7 h-7 rounded-full object-cover" />
                  <div>
                    <p className="text-xs text-gray-400">Host</p>
                    <p className="text-xs font-semibold text-gray-700">{room.host}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  <span className="font-semibold text-gray-600">{room.members}</span> members
                </div>
              </div>

              {/* Join Button */}
              <button
                onClick={() => navigate(`/rooms/${room.id}`)}
                className="mt-4 w-full py-2.5 rounded-xl text-sm font-semibold text-white
                  bg-blue-950 hover:bg-blue-800 transition-colors duration-200"
              >
                Join Room →
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-20 text-gray-400">
            No rooms found for "{search}"
          </div>
        )}
      </div>
    </div>
  )
}
