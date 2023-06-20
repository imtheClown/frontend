import axios from "axios";
import { useState, useEffect } from "react";
import Reviews from '../Feedbacks/Reviews'
import AddReview from "./AddReview";
import Header from "../Header/Header";


const FeedbackMain = props => {
    const [post, setPost] = useState(null)
    const [reactions, setReactions] = useState(null)
    const [reload, setReload] = useState(false)
    const [agency_id, setAgencyId] = useState(props.agency_id)
    const user_id = sessionStorage.getItem("user_id")

    function reloadHandler(){
        if(reload){
            setReload(false)
        }else{
            setReload(true)
        }
    }

    async function PostGetter(){
        await(axios({
            method:"GET",
            url: `http://localhost:8000/api/agency/post/${agency_id}/`
        })).catch(err => {
            console.log("no likes on posts")
        }).then(resp =>{
            if(resp.data.length){
                setPost(resp.data)
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

    useEffect(() => {
        PostGetter()
        ReactionGetter()
    }, [reload])
    return <>
    <AddReview reload = {reloadHandler} agency_id = {agency_id}/>
    {post? 
        post && post.map(item => {
            var like_status = false
            if(reactions){
                for (var reaction in reactions){
                    like_status = false
                    if(reactions[reaction]["post_id"] == item["post_id"]){
                        like_status = true
                        break;
                    }
                }
            }
            return (
                <Reviews key= {item.post_id} post_id = {item.post_id}
                user_id = {user_id}
                content = {item.content}
                photo = {item.photo}
                numb_like = {item.numb_likes}
                user_photo = {item.user_photo}
                user_name = {item.user_name}
                agency_id = {agency_id}
                like_status = {like_status}
                date_created = {item.date_created}
                />
            )
        })
    : <div className="reviews-container d-flex justify-content-center">
            <>No Reviews Yet</>
        </div>}
    </>
}

export default FeedbackMain

