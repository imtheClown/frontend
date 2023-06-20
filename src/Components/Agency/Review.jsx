import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

import StarsRating from "react-star-rate";


const Review = (props) =>{
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);
    const [photo, setPhoto] = useState(null);
    const agency = props.agency_id
    const user_id = sessionStorage.getItem("user_id");

    async function submitReview(event){
        event.preventDefault()
        axios.defaults.xsrfCookieName = 'csrftoken'//tokens for csrf protocols
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"//tokens for csrf protocols
        axios({
            method: "POST",
            url: "http://localhost:8000/api/create_review/",
            data: {
                content: content,
                rating: rating,
                agency_id: agency,
                rating: rating,
                user_id: user_id,
                photo: photo
            },
            headers:{
                'content-type': 'multipart/form-data'//tells the api that the data send is from form thus enabling form/dataparsers
              }
        }).catch((err) => {
            console.log(err);
        }).then(()=>{
            console.log(user_id, content)
            setContent('');
            setRating(0);
            setPhoto(null);

            props.reload();
        })
        
    }
    function changeHandler(event){
        setContent(event.target.value);
    }
    function photoChangeHandler(event){
        setPhoto(event.target.files[0]);
    }


    return(
        <>
        <div className="agency-review-main">
            <div className="agency-review-left">
                <div className="agency-review-image">
                    <img src="" alt="" />
                </div>
            </div>
            <div className="agency-review-right">
                <form className="agency-review-form" action="" onSubmit={submitReview}>
                    <textarea className="agency-review-form-textarea" name="" id="" cols="30" rows="10" onChange={changeHandler} value={content} optional>
                    </textarea>
                    <input className="agency-review-form-files" type="file" name="" id="" onChange={photoChangeHandler}/>
                    <div className="agency-review-form-star">
                        <StarsRating value={rating} onChange={value => {setRating(value)}}/>
                    </div>
                    <input className="agency-review-form-submitbutton" type = "submit" />

                </form>
            </div>
        </div>
        </>
        
    )
}

export default Review;