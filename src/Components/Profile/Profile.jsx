import React from "react";
import axios from "axios";
import { useState } from "react";


const Profile = (props)=>{

    const user_id = localStorage.getItem("user_id");
    const [profile_picture, setProfilePicture] = useState("")

    async function PostProfile(event){
        event.preventDefault();
        let newForm = new FormData();
        newForm.append("user_id", user_id);
        newForm.append("user_photo", profile_picture);
        await(axios({
            method: "POST",
            url: "http://localhost:8000/api/profile/",
            data: {
                user_id: user_id,
                user_photo: profile_picture
            },
            headers: {
                'content-type': 'multipart/form-data'
            }
        })).catch((err)=>{
            console.log(err);
        }).then((resp) => console.log(resp));
        
    }

    function HandleChange(event){
        setProfilePicture(event.target.files[0]);
    }
    return(
        <>
        <form onSubmit={PostProfile}>
            <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={HandleChange}/>
            <input type="submit"/>click here
        </form>
        </>
    )
}

export default Profile;