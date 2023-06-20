import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const AgencyHeader = (props) => {
    const [agencyProfile, setAgencyProfile] = useState(null)

    async function HeaderDataGetter(){
        await axios({
            method: "GET",
            url: `http://localhost:8000/api/agency-profile/${props.agency_id}/`
        }).catch((err) =>{
            console.log(err);
        }).then((resp)=>{
            setAgencyProfile(resp.data)
        })
    }

    useEffect(() =>{
        HeaderDataGetter();
    }, []);


    return (
        <>
            {agencyProfile ? 
            <div id="profile-upper">
                <div id="profile-banner-image">
                    <img src={`http://localhost:8000/${agencyProfile.agency_background_photo}`} alt="Banner image"/>
                </div>
                <div id="profile-d">
                    <div id="profile-pic">
                        <img src={`http://localhost:8000/${agencyProfile.logo}`}/>
                    </div>
                    <div id="u-name">{agencyProfile.agency_name} ({agencyProfile.agency_acronym})</div>
                    <div class="tb" id="m-btns">
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                    </div>
                </div>
                <div id="black-grd"></div>
            </div>
            :
            <h1>No profile</h1>
}

        </>
    )
}

export default AgencyHeader;