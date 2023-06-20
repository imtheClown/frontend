import { Comments } from "./Comments"
import CommentReview from "./CommentsReview"
import './modal.css'
import axios from "axios"
import { useState, useEffect } from "react"
const CommentModal = props => {
    const [comment, setComment] = useState(null)
    const [reload, setReload] = useState(false)
    useEffect(()=>{
        CommentGetter()
    }, [reload])
    if(!props.showComment){
        console.log("This is false")
        return null
    }
    async function CommentGetter(){
        await axios({
            method: "GET",
            url: `http://localhost:8000/api/agency/post/comment/${props.post_id}/`
        }).catch(err =>{
            console.log(err);
        }
        ).then(resp => {
            if(resp){
                if(resp.data.length){
                    setComment(resp.data);
                }
                else{
                    setComment(null);
                }
            }
        })
    }
    return <>
    <div className="modalNew">
        <div className="d-flex justify-content-center rounded modalContent">
            <div className=" modal-content" >
                <div className="modal-header">
                    <button className= " buttonComment btn btn-primary" onClick={props.onClose}><i className="bi bi-caret-left-fill"></i></button>
                    <div className="container d-flex justify-content-center">
                        Commments
                    </div>
                </div>
                <div className="modalBody d-flex flex-column">
                    {
                        comment? comment.map(item =>{
                            return(
                                <Comments
                                key = {item["comment_id"]}
                                user_name = {item["user_name"]}
                                content = {item["content"]}
                                />
                            )
                        }):<div className="d-flex justify-content-center">Be the First One to Comment</div>
                    }
                </div>
                <div className="modal-footer">
                    <div className="comment-create-container container">
                        <CommentReview post_id ={props.post_id}
                        reload ={() =>{
                            setReload(!reload)
                        }}
                        user_id = {props.user_id}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
}

export default CommentModal