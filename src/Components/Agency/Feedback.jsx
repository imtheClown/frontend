import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import Review from "./Review";


const Feedback = props =>{
    const [post, setPost] = useState(null);
    const [mainPost, setMainPost] = useState(null);
    const [reactions, setReactions] = useState(null);
    const [reload, setReload] = useState(false);
    const [reviewHide, setReviewHide] = useState(false);
    const [comment, setComment] = useState(false);
    const agency_id = props.agency_id;
    const user_id = sessionStorage.getItem("user_id");
    var like_status = false


    async function PostGetter(){
        await(axios({
            method:"GET",
            url: `http://localhost:8000/api/agency/post/${agency_id}/`
        })).catch(err => {
            console.log("no likes on posts")
        }).then(resp =>{
            if(resp.data.length){
                setPost(resp.data)
                setMainPost(resp.data);
            }else{
                setPost(null);
            }

        })
    }
    async function ReactionGetter(){
        await(axios({
            method: "GET",
            url: `http://localhost:8000/api/agency/post/react/${agency_id}/${user_id}/`,
        })).catch(err => {
            console.log(err);
        }).then(resp =>{
            setReactions(resp.data);
        })
    }

    function handleReload(){
        if(reload){
            setReload(false);
        }else{
            setReload(true);
        }

    }
    function HideReview(post_id){
        if(reviewHide){
            setReviewHide(false);
            setMainPost(post);
            setComment(false);
        }
        else{
            setReviewHide(true);
            setComment(true);
            post.forEach(items =>{
                if(items["post_id"] === post_id){
                    setMainPost(items)
                }
            })
            if(reactions){
                reactions.forEach(react =>{
                    if(reactions["post_id"] === post_id){
                        like_status = true;
                    }
                })
            }
        }
    }

    useEffect(() =>{
        ReactionGetter();
        PostGetter();
    }, [reload])
    return(
        <>
        {reviewHide? <></>: <Review agency_id = {agency_id} reload = {handleReload}/>}
        {comment? <Post post_id = {mainPost.post_id}
                        user_id = {user_id}
                        content = {mainPost.content}
                        photo = {mainPost.photo}
                        numb_like = {mainPost.numb_likes}
                        user_photo = {mainPost.user_photo}
                        user_name = {mainPost.user_name}
                        agency_id = {agency_id}
                        like_status = {like_status}
                        reload = {HideReview}
                        showComment = {true}
                        />:
            post? 
            post.map(item =>{
                if(reactions){
                    reactions.forEach(element => {
                        like_status = false
                        if(element["post_id"] === item.post_id){
                            like_status = true
                        }
                        
                    });
                }
                return <Post key= {item.post_id} post_id = {item.post_id}
                        user_id = {user_id}
                        content = {item.content}
                        photo = {item.photo}
                        numb_like = {item.numb_likes}
                        user_photo = {item.user_photo}
                        user_name = {item.user_name}
                        agency_id = {agency_id}
                        like_status = {like_status}
                        reload = {HideReview}
                        showComment = {false}
                        
                        />
            })
            : <div>
                no posts yet
            </div>
        }
        </>
    )
}

export default Feedback;