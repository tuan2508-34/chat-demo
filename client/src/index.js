import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import ChatProvider from "./Context/ChatProvider";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Router>

 <ChatProvider> 
  
      <App />
  </ChatProvider>
   
  
 
  </Router>

);

