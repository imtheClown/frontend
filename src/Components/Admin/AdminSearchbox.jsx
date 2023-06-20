import './create-agency.css'
import AgencyBox from './AgencyBox'
const AdminSearchbox = props =>{
    return <>
    <div className="admin-page-search-container d-flex flex-column rounded">
        <div className="admin-page-search-box rounded">
            <div class="input-group">
            <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            <button type="button" class="btn btn-outline-primary">search</button>
            </div>
        </div>
        <div className='admin-page-results'>
            <div className=" rounded admin-page-center-main p-2 d-flex flex-column justify-content-start">
                <p className="recently-added-text">All Agencies</p>
                    <div className="admin-page-recently-new d-flex flex-lg-wrap">
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
    </>
}

export default AdminSearchbox