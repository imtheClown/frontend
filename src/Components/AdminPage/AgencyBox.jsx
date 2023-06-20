import './admin.css'

const AgencyBox = props =>{
    return<>
        <div className="rounded admin-page-agency-content d-flex flex-column">
            <div className="admin-page-img-holder">
                <img className="admin-page-agency-img" src="" alt="" />
            </div>
            <div className="admin-page-agency-details-container d-flex justify-content-center flex-column ">
                <h1 className="admin-page-agency-details-name">Agency Name</h1>
                    <h1 className="admin-page-agency-details-acro">Acronym</h1>
                    <h1 className="admin-page-agency-details-location">Location</h1>
                    <h1 className="admin-page-agency-details-rating">Rating</h1>
            </div>
        </div>
    </>
}

export default AgencyBox