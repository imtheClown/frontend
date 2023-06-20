import { useState } from "react"
import { Comments } from "./Comments"
import axios from "axios"
const CommentReview =props =>{
    const [content, setContent] = useState("")
    const [disable, setDisable] = useState(true)
    const user_id = props.user_id
    const post_id = props.post_id

    function changeHandler(event){
        setContent(event.target.value)
        if(!content.length){
            setDisable(true)
        }else{
            setDisable(false)
        }
    }
    async function submitComment(event){
        event.preventDefault();
        axios.defaults.xsrfCookieName = 'csrftoken'//tokens for csrf protocols
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"//tokens for csrf protocols
        await axios({
            method: "POST",
            url: `http://localhost:8000/api/agency/post/comment/create/`,
            data: {
                content: content,
                user_id: user_id,
                post_id: post_id,
            },
            headers:{
                'content-type': 'multipart/form-data'//tells the api that the data send is from form thus enabling form/dataparsers
              }
        }).catch(err => {
            console.log(err);
        }).then(resp =>{
            setContent("");
            props.reload();
        })
        
    }
    return(
        <>
    <form onSubmit={submitComment} className="commentForm">
        <strong>Add a comment</strong>
        <textarea className="form-control" 
            placeholder="Write comment here..." 
            value={content}
            onChange={changeHandler}
            required
        />
        <footer>
            <input className="btn btn-primary" disabled={disable} type="submit"value={"submit"}></input>
        </footer>
    </form>
    </>
    )
}

export default CommentReview