import React, { useState, useEffect } from 'react'
import {MdLocationOn} from "react-icons/md";
import './reviews.css'
import iconpic from '../Assets/icon.jpg'
import Date from '../Feedbacks/date'
import Like from '../LikeButton/Like'
import { Comments } from '../Comments/Comments'
import Rating from '../Feedbacks/Rating'
import axios from 'axios';
import CommentReview from '../Comments/CommentsReview';
import CommentModal from '../Comments/CommentModal'



const AddReview = props => {
  const [showComment, setShowComment] = useState(false)


  const post_id = props.post_id
  const user_id = props.user_id
  const content = props.content
  const photo = props.photo
  const user_photo = props.user_photo
  const user_name = props.user_name
  const agency_id = props.agency_id
  const date_created = props.date_created
  const numb_like = props.numb_like
  const like_status = props.like_status
   return (
    <main>
      {showComment? <CommentModal
      user_id ={user_id}
      post_id ={post_id}
      showComment ={showComment}
      onClose = {()=>{setShowComment(false)}} 
      />:
      <></>}
    <div className="reviews-container">
        <div className="flex-container post">
        <header className="headerPost">
            <div className="author">
                <img src={`http://localhost:8000/${user_photo}`} className="icon-author" alt="logo"/>
                <div className="authorInfo">
                    <strong className='authorName'><a href="#">{user_name}</a></strong>
                    {/* <Date dateString={postData.date} /> */}
                    <span className='date'>Uploaded last <Date dateString={date_created}/></span>
                </div>
            </div>
        </header>
        {/* <Date dateString={postData.date} /> */}

        <div className="content"> 
        <span className='content-txt'>{content}
        </span>
        <a href="#" class="post-pic">
		{photo? <img className='imageReview'  src={`http://localhost:8000/${photo}`}/> : <></>}
		</a>
      {
        user_id? <div className='post-bottom d-flex justify-content-start'>
                    <div className='d-flex justify-content-around bottom-content'>
                    <span className='action-btns'><Like numb_like ={numb_like} like_status ={like_status}
                    user_id = {user_id}
                    agency_id = {agency_id}
                    post_id = {post_id}

                    /></span>
                    <span className='action-btns'><button className='button-28' role='button' onClick={()=>{setShowComment(true) }}><i class="bi bi-chat-left"></i></button></span>
                    </div>
                </div>
              :
              <></>
      }
        </div>

      </div>
    </div>
  </main>
  )
}

export default AddReview