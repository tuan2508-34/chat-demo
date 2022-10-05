import "./App.css";
import Homepage from "./Pages/homePage";
import {Routes,Route } from "react-router-dom";
import Chatpage from "./Pages/chat";

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/chat" element={<Chatpage/>} />
      </Routes>
     
    </div>
  );
}

export default App;
