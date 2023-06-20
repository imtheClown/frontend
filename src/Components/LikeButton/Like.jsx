import React, { useState } from "react";
import '../LikeButton/like.css'
import {AiFillLike} from "react-icons/ai";
import axios from "axios";

const LikeButtonCompoent = (props) => {
  const post_id = props.post_id
  const user_id = props.user_id
  const agency_id = props.agency_id
  const [like, setLike] = useState(props.numb_like),
    [isLike, setIsLike] = useState(props.like_status)

  function onLikeButtonClick(){
    setLike(like + (isLike?-1:1));
    setIsLike(!isLike);
  };
  async function LikeHandler(event){
    axios.defaults.xsrfCookieName = 'csrftoken'//tokens for csrf protocols
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"//tokens for csrf protocols
    if(isLike){
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
            setIsLike(false);
            setLike(like - 1);
            
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
            setIsLike(true);
            setLike(like + 1)
        })

    }
}

  return (
    <>
      <button 
        className={"button-28 like-button " + (isLike ? "liked" :"" )}
        onClick={LikeHandler}
        role="button"
      >
      <AiFillLike className='icon-like'/>{""} {like}
      </button>
      <style>{`
        .like-button {
            font-size: 1.2rem;
            border: none;
            cursor: pointer;
            background:none;
            color:  #585858;
        }
        .liked {
            font-weight: bold;
            color: #1565c0;
            background:none;
            border: none;
          }
      `}</style>
    </>
  );
};

export default function App(props) {
  return <LikeButtonCompoent like_status = {props.like_status} numb_like = {props.numb_like} agency_id ={props.agency_id} 
  post_id = {props.post_id}
  user_id = {props.user_id}
  />;
}