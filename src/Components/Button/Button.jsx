import { useNavigate, Link } from "react-router-dom"
const Button = props =>{
    return(
        <Link to ="/login/"><button type="submit" className=""> Join </button></Link>
    )
}

export default Button