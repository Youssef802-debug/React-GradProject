import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

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
    about: "This room is dedicated to people experiencing anxiety and stress in their daily lives. We share tips, breathing exercises, grounding techniques, and emotional support. All backgrounds and experiences are welcome.",
    rules: ["Be kind and respectful", "No medical diagnoses", "Keep personal stories confidential", "Support, don't judge"],
    memberList: [
      { name: "Dr. Sara Mohamed", photo: "https://i.pravatar.cc/150?img=47", role: "Host" },
      { name: "Ahmed Hassan", photo: "https://i.pravatar.cc/150?img=11", role: "Member" },
      { name: "Nour Ali", photo: "https://i.pravatar.cc/150?img=56", role: "Member" },
      { name: "Omar Khaled", photo: "https://i.pravatar.cc/150?img=33", role: "Member" },
      { name: "Layla Youssef", photo: "https://i.pravatar.cc/150?img=23", role: "Member" },
      { name: "Karim Adel", photo: "https://i.pravatar.cc/150?img=15", role: "Member" },
    ],
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
    about: "A compassionate community for people navigating depression. We talk honestly about the hard days, celebrate small wins, and remind each other that healing is possible. No pressure, no judgment.",
    rules: ["Listen actively", "No toxic positivity", "Respect everyone's pace", "Crisis? Reach out to a professional"],
    memberList: [
      { name: "Ahmed Hassan", photo: "https://i.pravatar.cc/150?img=11", role: "Host" },
      { name: "Sara Mohamed", photo: "https://i.pravatar.cc/150?img=47", role: "Member" },
      { name: "Mona Tarek", photo: "https://i.pravatar.cc/150?img=44", role: "Member" },
      { name: "Youssef Ali", photo: "https://i.pravatar.cc/150?img=67", role: "Member" },
      { name: "Dina Hassan", photo: "https://i.pravatar.cc/150?img=38", role: "Member" },
    ],
  },
  {
    id: "r3", name: "Self-Esteem & Confidence", description: "Building a healthier relationship with yourself.", topic: "Self-Esteem", members: 28, host: "Nour Ali", hostPhoto: "https://i.pravatar.cc/150?img=56", emoji: "🌱", color: "from-emerald-500 to-teal-400",
    about: "We work together on building self-worth and challenging negative self-talk. Weekly affirmations, personal growth challenges, and honest conversations about confidence.",
    rules: ["Celebrate each other's progress", "No comparison", "Be honest and kind", "Share, don't prescribe"],
    memberList: [
      { name: "Nour Ali", photo: "https://i.pravatar.cc/150?img=56", role: "Host" },
      { name: "Ahmed Hassan", photo: "https://i.pravatar.cc/150?img=11", role: "Member" },
      { name: "Rania Samir", photo: "https://i.pravatar.cc/150?img=29", role: "Member" },
    ],
  },
  {
    id: "r4", name: "Trauma & Recovery", description: "A gentle room for those healing from past trauma.", topic: "Trauma", members: 19, host: "Omar Khaled", hostPhoto: "https://i.pravatar.cc/150?img=33", emoji: "🕊️", color: "from-purple-500 to-pink-400",
    about: "Trauma recovery is not linear. This room provides a gentle, trauma-informed space to share your story when you're ready. We practice empathy and never rush healing.",
    rules: ["Content warnings encouraged", "No unsolicited advice", "Respect silence", "You are believed here"],
    memberList: [
      { name: "Omar Khaled", photo: "https://i.pravatar.cc/150?img=33", role: "Host" },
      { name: "Sara Mohamed", photo: "https://i.pravatar.cc/150?img=47", role: "Member" },
      { name: "Hana Mostafa", photo: "https://i.pravatar.cc/150?img=53", role: "Member" },
    ],
  },
  {
    id: "r5", name: "Mindfulness & Meditation", description: "Learn and practice mindfulness techniques together.", topic: "Mindfulness", members: 41, host: "Dr. Sara Mohamed", hostPhoto: "https://i.pravatar.cc/150?img=47", emoji: "🌸", color: "from-rose-400 to-orange-300",
    about: "Daily mindfulness check-ins, guided meditation discussions, and breathing exercises shared by the community. Beginners are very welcome.",
    rules: ["Be present", "No phones during sessions", "Respect different practices", "Kind words only"],
    memberList: [
      { name: "Dr. Sara Mohamed", photo: "https://i.pravatar.cc/150?img=47", role: "Host" },
      { name: "Nour Ali", photo: "https://i.pravatar.cc/150?img=56", role: "Member" },
      { name: "Tarek Sami", photo: "https://i.pravatar.cc/150?img=60", role: "Member" },
      { name: "Lina Omar", photo: "https://i.pravatar.cc/150?img=49", role: "Member" },
    ],
  },
  {
    id: "r6", name: "OCD Awareness", description: "Understanding and managing OCD together.", topic: "OCD", members: 15, host: "Ahmed Hassan", hostPhoto: "https://i.pravatar.cc/150?img=11", emoji: "🔄", color: "from-yellow-500 to-amber-400",
    about: "A dedicated space for those living with OCD. We share experiences with intrusive thoughts, compulsions, ERP therapy progress, and celebrate every step forward.",
    rules: ["No reassurance-seeking loops", "ERP-informed discussions", "Be patient", "Celebrate small wins"],
    memberList: [
      { name: "Ahmed Hassan", photo: "https://i.pravatar.cc/150?img=11", role: "Host" },
      { name: "Omar Khaled", photo: "https://i.pravatar.cc/150?img=33", role: "Member" },
      { name: "Yasmin Fares", photo: "https://i.pravatar.cc/150?img=41", role: "Member" },
    ],
  },
]

export default function RoomDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [joined, setJoined] = useState(false)

  const room = ROOMS.find(r => r.id === id)

  if (!room) return (
    <div className="min-h-screen flex items-center justify-center text-gray-400">
      Room not found. <button onClick={() => navigate('/rooms')} className="ml-2 text-blue-600 underline">Go back</button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className={`bg-gradient-to-r ${room.color} py-10 px-6 text-center text-white`}>
        <span className="text-5xl">{room.emoji}</span>
        <h1 className="text-3xl font-bold mt-2">{room.name}</h1>
        <span className="inline-block mt-2 bg-white bg-opacity-20 text-white text-xs px-3 py-1 rounded-full">
          {room.topic}
        </span>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-5">

        {/* About Card */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-bold text-gray-800 mb-2">About this room</h2>
          <p className="text-gray-500 text-sm leading-relaxed">{room.about}</p>

          {/* Stats row */}
          <div className="flex gap-6 mt-4 pt-4 border-t text-center">
            <div>
              <p className="text-xl font-bold text-blue-950">{room.members + (joined ? 1 : 0)}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Members</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mt-1">
                <img src={room.hostPhoto} alt={room.host} className="w-7 h-7 rounded-full" />
                <div className="text-left">
                  <p className="text-xs text-gray-400">Host</p>
                  <p className="text-sm font-semibold text-gray-700">{room.host}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rules Card */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-bold text-gray-800 mb-3">Room Rules 📋</h2>
          <ul className="flex flex-col gap-2">
            {room.rules.map((rule, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold flex-shrink-0">{i + 1}</span>
                {rule}
              </li>
            ))}
          </ul>
        </div>

        {/* Members Card */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-bold text-gray-800 mb-3">Members ({room.memberList.length + (joined ? 1 : 0)})</h2>
          <div className="flex flex-col gap-3">
            {room.memberList.map((member, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={member.photo} alt={member.name} className="w-9 h-9 rounded-full object-cover" />
                  <p className="text-sm font-medium text-gray-800">{member.name}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                  ${member.role === 'Host' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                  {member.role}
                </span>
              </div>
            ))}
            {joined && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="https://i.pravatar.cc/150?img=11" alt="You" className="w-9 h-9 rounded-full object-cover" />
                  <p className="text-sm font-medium text-gray-800">Ahmed Hassan <span className="text-xs text-gray-400">(You)</span></p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-600">Joined</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/rooms')}
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-gray-600 bg-white shadow-sm hover:bg-gray-50 transition-colors"
          >
            ← Back to Rooms
          </button>
          <button
            onClick={() => setJoined(!joined)}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-colors
              ${joined ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-950 hover:bg-blue-800'}`}
          >
            {joined ? 'Leave Room' : 'Join Room 🚀'}
          </button>
        </div>

      </div>
    </div>
  )
}
