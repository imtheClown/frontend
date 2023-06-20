import './OkModal.css'
const AddPostModal = props => {

    return <>
    <div className="create-review-modal">
        <div className="create-review-modal-content d-flex justify-content-center rounded flex-column">
            <div className="create-review-modal-main d-flex justify-content-center flex-row">
                Feedback Successfully Posted
            </div>
            <div className="create-review-modal-footer d-flex justify-content-center flex-row">
            <div ><button
            className="button-28" role='button' onClick={() =>{
                props.show()
                props.reload()
            }}>OK</button></div>
            </div>
        </div>
    </div>
    </>
}

export default AddPostModal