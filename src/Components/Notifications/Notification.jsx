import '../Notifications/notifs.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NotificationContainer from './NotificationContainer';
import { Truck } from 'phosphor-react';

const Notifications = (props) => {
    const user_id = props.user_id
    const [notifications, setNotifications] = useState(null)
    const [unread, setUnread] = useState(null)
    const [showUnread, setShowUnread] = useState(false)
    const [reload, setReload] = useState(false)
 

    async function getNotifs(){
        await axios({
            method: "GET",
            url: `http://localhost:8000/api/notification/get/${user_id}/`,
        }).catch(err =>{
            console.log(err)
        }).then(resp =>{
            if(resp){
                setNotifications(resp.data)
                    
            }else{
                setNotifications(null)
            }
            
        })

    }

    useEffect(()=>{
        getNotifs()
    }, [reload])
    return(
        <div className="notifications_dd">
            <ul className="notifications_ul">
                <div className="notif_heading">Notifications</div>
                {notifications && notifications.map(item =>{
                    return <NotificationContainer
                    key = {item["post_notification_id"]}
                    reload = {() =>{setReload(!reload)}}
                    read_status = {item["read_status"]}
                    notif_type = {item["notif_type"]}
                    user_name = {item["user_name"]}
                    post_notification_id = {item["post_notification_id"]}
                    />
                })
}


            </ul>
        </div>
    )
}

export default Notifications