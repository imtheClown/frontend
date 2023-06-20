import { useState } from "react"
import axios from "axios"

const NotificationContainer = props =>{
    const [readStatus ,setReadStatus] = useState(props.read_status)
    const notif_type = props.notif_type
    const user_name = props.user_name
    const notification_id = props.post_notification_id

    async function removeUnreadStatus(){
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
        await axios({
            method: "POST",
            url: `http://localhost:8000/api/post/edit/`,
            data :{
                "post_notification_id" : notification_id
            },
            headers: {
                'content-type': 'multipart/form-data'
              }
        }).then(resp =>{
            props.reload()
        })
    }
    function checkValid(){
        if(!readStatus){
            removeUnreadStatus()
        }
    }
    return(
    <li className='unread_notif'>
        <div className="notify_data">
          <div className="notify_title">
            Your feedback recieved a {notif_type == 1 ?"comment": "upvote" }
          </div>
          <div className="sub_title">
            {user_name} {notif_type == 1 ? "commented": " upvoted"} your feedback
          </div>
        </div>
        <div className="notify_status">
          <a onClick = {checkValid}><p>{readStatus? "read": "unread"}</p></a>
        </div>
      </li>
    )
}

export default NotificationContainer