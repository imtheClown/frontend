import './admin.css'

const AgencyBox = props =>{
    const logo = props.logo
    const agency_name = props.agency_name
    const agency_id = props.agency_id
    const rating = props.rating
    const location = props.location
    const acronym = props.acronym
    
    return<>
        <div className="rounded admin-page-agency-content d-flex flex-column">
            <div className="admin-page-img-holder">
                <img className="admin-page-agency-img" src={`http://localhost:8000/${logo}`} alt="" />
            </div>
            <div className="admin-page-agency-details-container d-flex  flex-column ">

                <h1 className="admin-page-agency-details-name">{agency_name}</h1>
                    <h1 className="admin-page-agency-details-acro">{acronym}</h1>
                    <h1 className="admin-page-agency-details-location">{location}</h1>
                    <h1 className="admin-page-agency-details-rating">{rating}</h1>
            </div>
        </div>
    </>
}

export default AgencyBox