import axios from "axios";
import { useEffect, useState } from "react";
import Reply from "./Reply";
import ReplyReview from "./ReplyReview";

const ReplyMain = props => {
    const [replies, setReplies] = useState(null);
    const [reload, setReload] = useState(false);
    const comment_id = props.comment_id
    const user_id = props.user_id

    useEffect(() =>{
        GetReplies();
    }, [reload])
    async function GetReplies(){
        await(axios({
            method: "GET",
            url: `http://localhost:8000/api/agency/post/comment/reply/${comment_id}/`,
        })).catch(err =>{
            console.log(err);
        }).then(resp =>{
            if(resp.data.length){
                setReplies(resp.data)
            }
            else{
                setReplies(null);
            }
            
        })
    }

    function reloadHandler(){
        if(reload){
            setReload(false);
        }else{
            setReload(true);
        }
    }
    return<>
        <ReplyReview
        user_id = {user_id}
        comment_id = {comment_id}
        reload = {reloadHandler}
        />
        {replies? replies.map(reply =>{
            return <Reply
            key = {reply["reply_id"]}
            user_name = {reply["user_name"]}
            user_photo = {reply["user_photo"]}
            content ={reply["content"]}            
            />
        }):
        <div className="empty_reply">be the first one to reply</div>
        }
    </>
}
export default ReplyMain;