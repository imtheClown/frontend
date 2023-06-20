import { useState, useEffect } from "react";
import axios from "axios";
import AgencyBox from "./AgencyBox";


const AdminAll = props =>{
    return
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
}