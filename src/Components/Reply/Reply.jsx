const Reply = props =>{
    const content = props.content;
    const user_photo = props.user_photo
    const user_name = props.user_name


    return <>
        <div className="reply-container">
            <h1>This is a reply</h1>
            <div className="reply-header">
                <img className="reply-header-userphoto" src="" alt="" />
                <h1 className = "reply-header-username">{user_name}</h1>
            </div>
            <div className="reply-content-container">
                <h1 className="reply-content">{content}</h1>
            </div>
        </div>
    </>
}

export default Reply;