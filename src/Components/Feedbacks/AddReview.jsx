import React, { useEffect, useState } from 'react'
import {MdLocationOn} from "react-icons/md";
import {RiCameraLensFill} from "react-icons/ri";
import './add.css'
import iconpic from '../Assets/icon.jpg'
import Rating from '../Feedbacks/Rating'
import axios from 'axios';
import AddPostModal from './AddPostModal';
import { FaStar } from "react-icons/fa";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
};



const AddReview = (props) => {
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);
    const [photo, setPhoto] = useState(null);
    const [show, setShow] = useState(false)
    const agency = props.agency_id
    const user_id = sessionStorage.getItem("user_id");
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0)


    async function submitReview(event){
        event.preventDefault()
        axios.defaults.xsrfCookieName = 'csrftoken'//tokens for csrf protocols
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"//tokens for csrf protocols
        await axios({
            method: "POST",
            url: "http://localhost:8000/api/create_review/",
            data: {
                content: content,
                rating: rating,
                agency_id: agency,
                user_id: user_id,
                photo: photo
            },
            headers:{
                'content-type': 'multipart/form-data'//tells the api that the data send is from form thus enabling form/dataparsers
              }
        }).catch((err) => {
            console.log(err);
        }).then(()=>{
            setContent('');
            setRating(0);
            setPhoto(null);
            setShow(true)
        })
        
    }
    function changeHandler(event){
        setContent(event.target.value);
    }
    function photoChangeHandler(event){
        setPhoto(event.target.files[0]);
    }
    const handleClick = value => {
        setRating(value)
      }
      const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
      };
    
      const handleMouseLeave = () => {
        setHoverValue(undefined)
    }
  return (
    <main>
    {
        show? <AddPostModal show = {() =>{setShow(!show)}} reload = {() =>{
            props.reload()
        }}/>
        :
        <></>
    }
    <div className="feedback-container">
        <div class="feedback-heading">FEEDBACKS RECEIVED</div>
        {user_id? <div className="flex-container add-feedback">
            <div className="add-feedback-header"><p>Leave a Review</p></div>
            <form action="#">
                <div class="content">
                    <img src={iconpic} className="logo" alt="logo"/>   
                    <div class="details">
                        <textarea placeholder="Share your thoughts about us..." spellcheck="false" value={content} onChange={changeHandler}></textarea>
                    </div>
                </div>
                <div class="options"><p className='options-txt'>Add rating</p>
                    <div style={styles.container}>
                        <div style={styles.stars}>
                            {stars.map((_, index) => {
                            return (
                                <FaStar
                                key={index}
                                size={24}
                                onClick={() => handleClick(index + 1)}
                                onMouseOver={() => handleMouseOver(index + 1)}
                                onMouseLeave={handleMouseLeave}
                                color={(hoverValue || rating) > index ? colors.orange : colors.grey}
                                style={{
                                    marginRight: 10,
                                    cursor: "pointer"
                                }}
                                />
                            )
                            })}
                        </div>

                        
                        </div>


                    <ul class="list-addreview">
                    <input onChange={photoChangeHandler} accept="image/png, image/jpeg, image/svg" className="form-control-file" type="file" name="logo" id="logo" />
                    </ul>
                </div>
                <button onClick={submitReview}>Post</button>
            </form>
      </div>:
      <></>}
    </div>
  </main>
  )
}

export default AddReview
const styles = {
    container: {
      display: "flex",
      marginTop: '0px',
      flexDirection: "column",
    },
    stars: {
      display: "flex",
      flexDirection: "row",
    },
  
  };