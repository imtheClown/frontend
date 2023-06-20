import React, { useState, useEffect } from 'react' 
import "../UserProfile/Card2.css"
import agencylogo from "./AGENCY_LOGO.png";
import axios from 'axios';
import Date from '../Feedbacks/date';
function Card() 
{

    const user_id = sessionStorage.getItem("user_id")
    const [post, setPost] = useState(null)

    async function getPost(){
        await axios({
            method:"GET",
            url: `http://localhost:8000/api/post/get/${user_id}/`
        }).then(resp=>{
            if(resp){
                if(resp.data.length){
                    setPost(resp.data)
                    console.log(resp)
                }
                else{
                    setPost(null)
                }
                
            }
        })
    }

    useEffect(()=>{
        getPost()
    }, [])

  return (
    <div className= 'popularRev_container'>
        <div className ="popularReviews-upper"> 
            <h3 className='popularReviews-title'>Activity Log </h3>
        </div>
       {
        post? post.map(item =>{
            return(
                <div className="author2">
                <img src={`http://localhost:8000/${item["logo"]}`} className="icon-author2" alt="logo"/>
                <header className="authorInfo2 flex">
                    <strong className='authorName2'><a>{item["agency_name"]}</a></strong>
                    {/* <Date dateString={postData.date} /> */}
                    <span className='date2'><Date dateString={item["date_created"]} /></span>
                </header>
                
                <div className="authorInfo3">
                    <span className='date3'>“{item["content"]}”</span>
                </div>
                
              
            </div>
            )
        }) : <div className='author2'>No Activity Yet</div>
       }


    </div>


    
  )
}

export default Card
