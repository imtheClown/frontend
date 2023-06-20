import React from "react";
import axios from "axios";
import { useState } from "react";


const AgencyProfile = () => {
    const [agency_acronym, setAgencyAcronym] = useState("");
    const [agency_background_photo, setAgencyBackgroundPhoto] = useState(null);
    const [agency_id, setAgencyId] = useState("");

    function acronymChangeHandler(event){
        setAgencyAcronym(event.target.value);
    }
    function agencyBackgroundPhotoChangeHandler(event){
        setAgencyBackgroundPhoto(event.target.files[0]);
    }

    function agencyIDChangeHandler(event){
        setAgencyId(event.target.value);
    }

    async function agencyProfileCreator(event){
        axios.defaults.xsrfCookieName = 'csrftoken'//tokens for csrf protocols
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"//tokens for csrf protocols
        event.preventDefault();
        await axios({
            url: "http://localhost:8000/api/agency-profile/",
            method: "POST",
            data:{
                agency_acronym : agency_acronym,
                agency_background_photo : agency_background_photo,
                agency_id: agency_id
            },
            headers:{
                'content-type': 'multipart/form-data'//tells the api that the data send is from form thus enabling form/dataparsers
              }
        }).catch((err) => {
            console.log(err);
        }).then((resp) => {
            console.log(resp)
        })
    }
    return (
        <> 
            <form onSubmit={agencyProfileCreator}>
                <input type="text" placeholder="Enter Agency" value={agency_id}  onChange={agencyIDChangeHandler} />
                <input type="text" placeholder="Enter Acronym" onChange={acronymChangeHandler} value={agency_acronym}/>
                <input type="file" accept="image/png, image/jpeg, image/svg" onChange={agencyBackgroundPhotoChangeHandler}/>
                <input type="submit"/>
            </form>
        </>
    )
}

export default AgencyProfile;