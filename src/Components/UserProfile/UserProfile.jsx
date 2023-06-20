
import './userprofile.css';
import Navbar from "../Navbar/Navbar";
import Card from "../UserProfile/Card";
import Card2 from "../UserProfile/Card2";
import Card3 from "../UserProfile/Card3";

function UserProfile() {
  return (
    
    <div className="App1"><Navbar/>
      <div className="Columns">
        <Card />
        <Card2 />
      </div>
      </div>
  );
}

export default UserProfile;
