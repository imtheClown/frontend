import { useState, useEffect } from "react"
import axios from "axios"
import './create-agency.css'
const CreateAgency = props => {
    const [agency_name, setAgencyName] = useState("")
    const [agency_acronym, setAgencyAcronym] = useState("")
    const [location, setLocation] = useState("")
    const [logo, setLogo] = useState(null)
    const [agency_background_photo, setAgencyBackgroundPhoto] = useState(null)



    function agencyNameHandler(event){
        setAgencyName(event.target.value)
    }
    function agencyAcronymHandler(event){
        setAgencyAcronym(event.target.value)
    }
    function locationHandler(event){
        setLocation(event.target.value)
    }
    function logoHandler(event){
        setLogo(event.target.files[0])
    }
    function backgroundPhotoHandler(event){
        setAgencyBackgroundPhoto(event.target.files[0])
    }
    
    async function createAgency(event){
        event.preventDefault()
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
        await(axios({
            method: "POST",
            url: 'http://localhost:8000/api/agency/',
            data: {
                agency_name: agency_name,
                agency_acronym: agency_acronym,
                location: location,
                logo: logo,
                agency_background_photo: agency_background_photo
            },
            headers: {
                'content-type': 'multipart/form-data'
              }
        })).then(resp =>{
            setAgencyAcronym("")
            setAgencyName("")
            setLocation("")
            setAgencyBackgroundPhoto(null)
            setLogo(null)
            props.reload()
        })
    }

    return <div className="container admin-page-form-container justify-content-start">
        <p className="admin-page-form-text">Create a New Agency</p>
        <form onSubmit={createAgency} className="" action="">
            <div className="form-group">
                <label className="form-label" htmlFor="agency_name">Agency Name</label>
                <input onChange={agencyNameHandler} className="form-control" type="text" name="agency_name" value={agency_name} id="agency_name" />
            </div>
            <div className=" form-group">
                <label className="form-label" htmlFor="agency_acronym">Agency Acronym</label>
                <input onChange={agencyAcronymHandler} className="form-control" type="text" name="agency_acronym" value={agency_acronym} id="agency_acronym" />

            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="location">Location</label>
                <input onChange={locationHandler} className="form-control" type="text" name="location" value={location} id="location" />

            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="logo">Logo</label>
                <input onChange={logoHandler} accept="image/png, image/jpeg, image/svg" className="form-control-file" type="file" name="logo" id="logo" />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="background">Background Photo</label>
                <input onChange={backgroundPhotoHandler} accept="image/png, image/jpeg, image/svg" className="form-control-file" type="file" name="background" id="background" />
            </div>
            <div className="form-group">
                <input className="btn btn-primary mb-2" type="submit" name="" id="submit" value={"Submit"} />
            </div>
        </form>
    </div>
    
}
export default CreateAgency