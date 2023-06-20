import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './header2.css'

const Header = (props) => {
  const [agencyProfile, setAgencyProfile] = useState({})
  const [agency_id, setAgencyID] = useState(props.agency_id)
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
  useEffect(()=>{
    HeaderDataGetter()
  },[])

  return (
    <main>
    <div className="profile-upper">
    <div className="profile-banner-image">
      <img key={agency_id} src={`http://localhost:8000/${agencyProfile.agency_background_photo}`} alt="Banner image"/>
    </div>
    <div className="profile-d">
      <div className="profile-pic">
        <img key={agency_id} src={`http://localhost:8000/${agencyProfile.logo}`}/>
      </div>
      <div className="u-name">{agencyProfile.agency_name} ({agencyProfile.agency_acronym})</div>
      <div class="tb" id="m-btns">
        <div class="td">
        </div>
        <div class="td">
        </div>
      </div>
    </div>
  </div>
  </main>
  )
}

export default Header