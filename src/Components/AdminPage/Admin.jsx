import { useState, useEffect } from "react";
import "./admin.css"
import AgencyBox from "./AgencyBox";
const AdminMain = props =>{
    return <>
        <div className=" admin-page-container d-flex justify-content-around">
            <div className="admin-page-left d-flex justify-content-start flex-column">
                <div className="admin-page-home-search rounded">
                    <div className="admin-page-texts">
                        Tugon
                    </div>
                    <div className="admin-page-texts">
                        Home
                    </div>
                    <div className="admin-page-texts">
                        Search
                    </div>
                </div>
                <div className="admin-page-add rounded ">
                    <div className="admin-page-texts">
                        Add Agency
                    </div>
                </div>
                <div className="admin-page-add rounded">
                    <div className="admin-page-texts">
                        Exit Admin Mode
                    </div>
                </div>
            </div>
            <div className="admin-page-center d-flex justify-content-around">
                <div className="admin-page-center-content flex-column">
                    <div className="admin-page-center-recent rounded p-2">
                        <p className="recently-added-text">Recently Added</p>
                        <div className="admin-page-recently-added d-flex flex-row justify-content-start">
                            <AgencyBox/>
                            <AgencyBox/>
                            <AgencyBox/>
                            <AgencyBox/>
                            <AgencyBox/>
                        </div>
                    </div>
                    <div className=" rounded admin-page-center-main p-2 d-flex flex-column justify-content-start">
                    <p className="recently-added-text">All Agencies</p>
                        <div className="admin-page-recently-added d-flex flex-lg-wrap">
                            <AgencyBox/>
                            <AgencyBox/>
                            <AgencyBox/>
                            <AgencyBox/>
                            <AgencyBox/>
                            <AgencyBox/>
                            <AgencyBox/>
                            <AgencyBox/>
                            <AgencyBox/>
                            <AgencyBox/>
                            <AgencyBox/>
                        </div>

                    </div>
                </div>
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