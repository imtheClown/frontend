import axios from "axios";
import { useState } from "react";


const ReplyReview = props =>{
    const [content, setContent] = useState("");
    const user_id = props.user_id
    const comment_id = props.comment_id

    async function replyCreator(event){
        event.preventDefault();
        axios.defaults.xsrfCookieName = 'csrftoken'//tokens for csrf protocols
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"//tokens for csrf protocols
        await axios({
            method: "POST",
            url: `http://localhost:8000/api/agency/post/comment/reply/create/`,
            data : {
                user_id: user_id,
                comment_id: comment_id,
                content: content
            },
            headers:{
                'content-type': 'multipart/form-data'//tells the api that the data send is from form thus enabling form/dataparsers
              }
        }).catch(err =>{
            console.log(err);
        }).then(resp => {
            setContent("");
            props.reload();
        })
    }
    function changeHandler(event){
        setContent(event.target.value);
    }
    return <>
        <div className="reply-review-container">
            <form className="reply-review-form" action="" onSubmit={replyCreator}>
                <textarea onChange={changeHandler} className="reply-review-content" name="" id="" cols="30" rows="10" value={content}></textarea>
                <input type="submit" value={"submit"} />
            </form>
        </div>
    </>
}
export default ReplyReview;