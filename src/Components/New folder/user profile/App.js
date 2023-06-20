
import './App.css';
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Card2 from "./components/Card2";
import Card3 from "./components/Card3";

function App() {
  return (
    <div className="App1 ">
      <Navbar />
      <div className="Columns">
        <Card />
        <Card2 />
        <Card3 />
      </div>
      
    </div>
  );
}

export default App;
