import React, { useState } from 'react'

export default function PostFooter({ post }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post?.post?.likes?.length || 0)
  const [showCommentBox, setShowCommentBox] = useState(false)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(post?.post?.comments || [])

  const user = JSON.parse(localStorage.getItem('user') || '{"name":"Ahmed Hassan","photo":"https://i.pravatar.cc/150?img=11"}')

  function handleLike() {
    setLiked(!liked)
    setLikeCount(prev => liked ? prev - 1 : prev + 1)
  }

  function handleComment(e) {
    e.preventDefault()
    if (!comment.trim()) return
    const newComment = {
      _id: 'c' + Date.now(),
      content: comment.trim(),
      commentCreator: { name: user.name, photo: user.photo },
      createdAt: new Date().toISOString(),
    }
    setComments(prev => [...prev, newComment])
    // Also update the actual post object so Postcard reflects it
    if (post?.post?.comments) post.post.comments.push(newComment)
    setComment('')
  }

  return (
    <>
      {/* Like / Comment / Share buttons */}
      <div className="grid grid-cols-3 w-full px-5 my-3">
        <button onClick={handleLike}
          className={`flex flex-row justify-center items-center w-full space-x-2 transition-colors
            ${liked ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24"
            fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
          <span className="font-semibold text-sm">{liked ? 'Liked' : 'Like'} {likeCount > 0 && `(${likeCount})`}</span>
        </button>

        <button onClick={() => setShowCommentBox(!showCommentBox)}
          className="flex flex-row justify-center items-center w-full space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="font-semibold text-sm">Comment {comments.length > 0 && `(${comments.length})`}</span>
        </button>

        <button className="flex flex-row justify-center items-center w-full space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx={18} cy={5} r={3} /><circle cx={6} cy={12} r={3} /><circle cx={18} cy={19} r={3} />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          <span className="font-semibold text-sm">Share</span>
        </button>
      </div>

      {/* Comment Box */}
      {showCommentBox && (
        <div className="px-4 pb-4 border-t pt-3">
          {/* Existing comments */}
          {comments.length > 0 && (
            <div className="flex flex-col gap-2 mb-3">
              {comments.map((c) => (
                <div key={c._id} className="flex items-start gap-2">
                  <img src={c.commentCreator?.photo} alt="" className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                  <div className="bg-gray-100 rounded-xl px-3 py-2 text-sm flex-1">
                    <p className="font-semibold text-xs text-gray-700">{c.commentCreator?.name}</p>
                    <p className="text-gray-600">{c.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* New comment input */}
          <form onSubmit={handleComment} className="flex items-center gap-2">
            <img src={user.photo} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            <input
              type="text"
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button type="submit"
              className="px-3 py-2 bg-blue-950 text-white rounded-full text-xs font-semibold hover:bg-blue-800 transition-colors">
              Send
            </button>
          </form>
        </div>
      )}
    </>
  )
}
