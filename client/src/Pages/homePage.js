
import Nav from 'react-bootstrap/Nav';
import { useState } from 'react';
import Login from '../components/authentication/login';
import Sign from '../components/authentication/signUp';
import "./page.css"
function Home() {
  const [tab,setTab]=useState(true)
    return (
      <div className="main_home">
          <div className="home_title">
             FREE-CHAT
          </div>
          <div className="home_info">
         
          <Nav variant="pills" className="flex-row tab">
            <Nav.Item className='home_info_tab' onClick={()=>{setTab(true)}}>
              <Nav.Link eventKey="first" className='home_info_tab_item'>Login</Nav.Link>
            </Nav.Item>
            <Nav.Item className='home_info_tab' onClick={()=>{setTab(false)}}>
              <Nav.Link eventKey="second" className='home_info_tab_item'>Sign Up</Nav.Link>
            </Nav.Item>
          </Nav>
          <div className='home_login'>
             {tab ? <Login/>:<Sign/>}
          </div>
        
          </div>
      </div>
    );
  }
  
  export default Home;