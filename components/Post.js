import React,{ useEffect, useState } from 'react'
import {useSession} from "next-auth/react"
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline"

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid"
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp , setDoc, doc, deleteDoc} from 'firebase/firestore';
import { db } from '../firebase';
import Moment from "react-moment"

function Post({id,username,userImg,img,caption}) {
  const {data: session} = useSession();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [likes,setLikes] = useState([]);
  const [hasLiked,setHasLiked] = useState(false)

  useEffect(()=>onSnapshot(
    query(collection(db,'posts',id,'comments'), orderBy('timestamp','desc'))
    ,snapshot=>{
    setComments(snapshot.docs);
    })
  ,[db,id])

  useEffect(()=> onSnapshot(collection(db,"posts",id,"likes"), (snapshot) =>
      setLikes(snapshot.docs)
    ) ,[db,id]);

  useEffect(()=>{
    setHasLiked(likes.findIndex(like =>(like.id === session?.user?.uid) )!== -1 )
  },[likes])

  const likePost = async () => {
    if(hasLiked) {
      await deleteDoc(doc(db,'posts',id,'likes',session.user.uid))
    }
    else {
      await setDoc(doc(db,"posts",id,"likes",session.user.uid),{
        username: session.user.username,
      })
    }
    
  }
  const sendComment = async (e) =>{
    e.preventDefault();
    
    const commentToSend = comment;
    setComment('');

    await addDoc(collection(db,"posts",id,"comments"),{
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  }
  return (
    <div>
        
        {/* Header */}
        <div className="bg-white my-7  border rounded-sm">
          <div className="flex items-center">
            <img 
            src={userImg} 
            alt={username} 
            className="rounded-full h-12 w-12 border p-1 mr-3"
            />
            <p className='flex-1 font-bold '>{ username }</p>
            <DotsHorizontalIcon className="h-5 mr-2"/>
          </div>
        </div>

        {/* Img */}
        <div>
          <img 
          src={img}
          alt={username}
          className="object-cover w-full"

          />
        </div>

        {/* Buttons */}
        {session && (
           <div className="flex justify-between pt-4 px-4">
           <div className="flex space-x-2">
             {hasLiked ? (
                <HeartIconFilled onClick={likePost} className="btn text-red-500" />

             ):
             (
              <HeartIcon  onClick={likePost} className="btn"/>
             )
             
            }
            
             
             <ChatIcon className="btn"/>
             <PaperAirplaneIcon className="btn " />
             
           </div>
           <BookmarkIcon className="btn end" />
         </div>
        )}
       
        

        {/* Caption */}
        <div>
          <p className="p-5 truncate">
            {likes.length > 0 && (
              <p className='font-semibold  mb-1'> <span className='font-bold'>{likes.length}</span> likes</p>
            )}
            <span className='font-bold mr-1'>{username} </span>{caption}
          </p>
        </div>

        {/* Comments */}
        {comments.length > 0 && (
          <div>
            {comments.map(comment=>(
              <div key={comment.id} 
              className="flex items-center space-x-2 mb-3">
                <img 
                src={comment.data().userImage} 
                className="h-7 w-7 rounded-full"/>
               
                <p 
                className='flex-1 text-sm'> 
                <span className='font-bold'>{comment.data().username}</span> {comment.data().comment}</p>
                <Moment fromNow className="text-xs font-semibold pr-5">
                  {comment.data().timestamp?.toDate()}
                </Moment>
              </div>
            ))}
          </div>
        )}
        
        {/* Input Box */}
        {session && (
          <form className="flex items-center">
          <EmojiHappyIcon className='h-9 p-1'/> 
          <input 
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border-none flex-1 focus:ring-0 "
          placeholder="Add a comment..."
          />
          <button
          type="submit"
          disabled={!comment.trim()}
          className='font-semibold text-blue-400'
          onClick={sendComment}
          >Post</button>

        </form>

        )}
        
         
    </div>
  )
}

export default Post