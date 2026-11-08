import React from 'react'
import PostHeader from '../pages/Card/PostHeader'
import PostBody from '../pages/Card/PostBody'
import PostFooter from '../pages/Card/PostFooter'

export default function Postcard(post) {


    
    
  return (
    <>
      <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-7">
   <PostHeader post={post} />
   
   <PostBody postId={post.post.id} post={post} />
   
<PostFooter post={post}/>

{post.post.comments.length > 0 && <div className="p-4 bg-gray-200 ">

 <div className="w-full h-16 flex items-center  justify-between ">
      <div className="flex">
        <img className=" rounded-full w-10 h-10 mr-3" src={post.post.comments[0].commentCreator.photo} alt='' />
        <div>    
          <h3 className="text-md font-semibold ">{post.post.comments[0].commentCreator.name}</h3>
          <p className="text-xs text-gray-500">{post.post.createdAt.split('.' , 1).join().replace('T' , ' ')}</p>
          <p>{post.post.comments[0].content}</p>
        </div>
      </div>
      <svg className="w-16" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg>
    </div>
    
</div>}


</div>
    
  
    </>
  )
}
