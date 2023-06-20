import { useState, useEffect } from "react";
import "./admin.css"
import AgencyBox from "./AgencyBox";
import CreateAgency from "./CreateAgency";
import AdminSearchbox from "./AdminSearchbox";
import axios from "axios";
const AdminMain = props =>{
    const [recent, setRecent] =useState(null)
    const [all_agencies, setAllAgencies] = useState(null)
    const [current, setCurrent] = useState(1)
    const [reload, setReload] = useState(false)
    function setCurrentPage(event){
        setCurrent(event.target.id)
    }
    async function GetAgencies(){
        await(axios({
            method:"GET",
            url: `http://localhost:8000/api/agency/get_all`
        })).catch(err=>{
            console.log(err)
        }).then(resp =>{
            setAllAgencies(resp.data)
            console.log(resp.data)
            var recent_agency = []
            for(var agency in resp.data){
                if(agency < 5){
                    recent_agency[agency] = resp.data[agency];
                }
                else{
                    break
                }
            }
            setRecent(recent_agency)
        })
    }
    function reloadHandler(){
        if(reload){
            setReload(false)
        }
        else{
            setReload(true)
        }
    }
    useEffect(() =>{
        GetAgencies()
    }, [reload])

    return <>
        <div className=" admin-page-container d-flex justify-content-around">
            <div className="admin-page-left d-flex justify-content-start flex-column">
                <div className="admin-page-home-search rounded">
                    <div className="admin-page-texts">
                        Tugon
                    </div>
                    <div id="1"  onClick={setCurrentPage} className={`${current == 1? "active": ""} rounded admin-page-texts`}>
                        Home
                    </div>
                    <div id="2" onClick={setCurrentPage}  className={`${current == 2 ? "active":""} rounded admin-page-texts`}>
                        Search
                    </div>
                    <div id="3" onClick={setCurrentPage} className={`${current==3 ? "active" : ""} rounded admin-page-texts`}>
                        Add Agency
                    </div>
                </div>
                <div className="admin-page-exit-container">
                    <div className="admin-page-add-exit rounded">
                        <div className="admin-page-texts">
                            Exit Admin Mode
                        </div>
                    </div>
                </div>
            </div>
            <div className="admin-page-center d-flex justify-content-around">
                { current == 1 ? <div className="admin-page-center-content flex-column">
                    <div className="admin-page-center-recent rounded p-2">
                        <p className="recently-added-text">Recently Added</p>
                        <div className="admin-page-recently-added d-flex flex-row justify-content-start">
                            {recent && recent.map(agency =>{
                                return <AgencyBox
                                logo = {agency["logo"]}
                                agency_name ={agency["agency_name"]}
                                agency_id = {agency["agency_id"]}
                                rating = {agency["rating"]}
                                location = {agency["location"]}
                                acronym = {agency["agency_acronym"]}
                                />
                            })}
                        </div>
                    </div>
                    <div className=" rounded admin-page-center-main p-2 d-flex flex-column justify-content-start">
                    <p className="recently-added-text">All Agencies</p>
                        <div className="admin-page-recently-added d-flex flex-lg-wrap">
                            {all_agencies && all_agencies.map(agency =>{
                            return <AgencyBox
                                logo = {agency["logo"]}
                                agency_name ={agency["agency_name"]}
                                agency_id = {agency["agency_id"]}
                                rating = {agency["rating"]}
                                location = {agency["location"]}
                                acronym = {agency["agency_acronym"]}
                                />
                            })}
                        </div>

                    </div>
                </div>: <></>}
                {current ==2? <AdminSearchbox reload ={reloadHandler}/>:<>+</>}
                {
                    current == 3?
                    <CreateAgency reload = {reloadHandler}/>:<></>
                }
            </div>
            <div className="admin-page-right d-flex ">
                <div className="admin-page-right-container rounded d-flex flex-column">
                    <div className="admin-page-hist">
                        <p className="recently-added-text history">History</p>
                    </div>
                    <div className="admin-page-hist-container rounded">
                        <p className="recently-added-text history-content">action here</p>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default AdminMain;