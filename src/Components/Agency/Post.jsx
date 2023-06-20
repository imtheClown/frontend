import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

import CommentMain from "../Comment/CommentMain";

const Post = (props) => {
    const showComment = props.showComment
    const [postReload, setPostReload] = useState(false);
    const [like, setLike] = useState(props.numb_like);
    const [like_status, setLikeStatus] = useState(props.like_status);
    const [hidePost, setHidPost] = useState(false);
    const user_id = props.user_id; //will be used for creating the comment entry
    const user_photo = props.user_photo;
    const post_id = props.post_id;   //will be used for creating the comment entry
    const user_name = props.user_name;
    const agency_id = props.agency_id;
    const content = props.content;
    const photo = props.photo //change this depending on the field name from the model
    var temp_like = props.numb_like;
    function postHider(){
        if(hidePost){
            setHidPost(false);
        }else{
            setHidPost(true);
        }
    }
    async function LikeHandler(event){
        axios.defaults.xsrfCookieName = 'csrftoken'//tokens for csrf protocols
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"//tokens for csrf protocols
        if(like_status){
            await axios({
                method: "DELETE",
                url: "http://localhost:8000/api/agency/post/react/delete/",
                data: {
                    user_id: user_id,
                    post_id: post_id
                },
                headers:{
                    'content-type': 'multipart/form-data'//tells the api that the data send is from form thus enabling form/dataparsers
                  }
            }).catch(err => {
                console.log(err);
            }).then(resp =>{
                if(postReload){
                    setPostReload(false);
                }else{
                    setPostReload(true);
                }
                setLikeStatus(false);
                setLike(like - 1);
                temp_like = like;
                
            })
        }
        else{
            await axios({
                method: "POST",
                url: "http://localhost:8000/api/agency/post/react/add/",
                data: {
                    user_id :user_id,
                    agency_id : agency_id,
                    post_id: post_id 
                },
                headers:{
                    'content-type': 'multipart/form-data'//tells the api that the data send is from form thus enabling form/dataparsers
                  }
            }).catch(err => {console.log(err)}
            ).then(resp =>{
                if(postReload){
                    setPostReload(false);
                }
                else{
                    setPostReload(true);
                }
                setLikeStatus(true);
                setLike(like + 1)
                temp_like = like
            })

        }
    }
    function CommentHandler(){
        if(showComment){
            props.reload(post_id);
            
        }else{
            props.reload(post_id);
           
        }
        
    }


    return(
        <>
        {
            !hidePost?         
        <div className="post-main-content" >
            <h1>This is a post</h1>
            <div className="post-header">
                <div className="post-header-image">
                    {user_photo? <img src={`http://localhost:8000/${user_photo}/`} alt="" />
                    : <></>}
                    
                </div>
                <div className="post-header-text">
                    <h1>{user_name}</h1>
                </div>
            </div>
            <div className="post-content">
                <div className="post-content-text">
                    <h1>{content}</h1>
                </div>
                <div className="post-content-image">
                    {photo ?<img className="post-content-actual-image" src={`http://localhost:8000/${photo}`}alt="" />:<></>}
                </div>
                <div className="post-content-footer">
                    <div className="post-content-like">
                        <button className="post-content-footer-like" onClick={LikeHandler}>{like_status? "LIKED" :"LIKE"}</button>
                        <h1 className="post-content-number-likes">{like}</h1>
                    </div>
                    <button className="post-content-footer-comment" onClick={CommentHandler}>comment</button>
                </div>
            </div>
        </div>: <></>
        }
        {showComment? <CommentMain 
                                    post_id ={post_id} 
                                    user_id = {user_id} 
                                    showDecider = {showComment} 
                                    postShower = {postHider} /> :<></>}
        </>
    )
}

export default Post
//clicking buttons will lead to creation of comments or reacting to the post