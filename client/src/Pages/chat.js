import "./page.css"
import { BsSearch } from 'react-icons/bs';
import { useState,useEffect,useRef } from "react";
import { useParams } from 'react-router-dom'
import loader from "../assets/loader.gif";
import { useNavigate } from "react-router";
import Info from "../components/subChat/info";
import LogOut from "../components/authentication/logOut";
import ListChat from "../components/listChat/listChat";
import ZoneChat from "../components/zoneChat/zoneChat";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";


function Chat() {
  const { user,id,setSearch,show,show2,setShow,setShow2} = ChatState();
  const [tim,setTim]=useState("")
  const [data,setData]=useState([])
  const textInput = useRef(0);
  function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}


function nhap(e){
  setTim(e.target.value)
  if(e.target.value===""){
    setShow("chat_content_left show")
    setShow2("chat_content_right show2")
  }
  else{
  setShow("chat_content_left")
  setShow2("chat_content_right")
  }
}


const  getData= async () => {
   
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get(`http://localhost:5000/api/user`, 
    config);
    setData(data)
   
  } catch (error){
  }
};


  useEffect(()=>{
    getData()
  },[user])
  useEffect(()=>{
    let ten = data.filter((item)=>{
      return xoa_dau(item.name.toLowerCase()).indexOf(xoa_dau(tim.toLowerCase())) !== -1
    })
   
    tim.length==0 ? setSearch([]): setSearch(ten)
  },[tim])
 
 
  
  console.log(show2)
  return (
    <div className="main_chat">
        <div className="chat_nav">
          <div className="chat_nav_item">
           <div className="item1">
              <BsSearch className="search"/>
              <input ref={textInput} className="input_user" placeholder="Search User"  onChange={nhap}/>
           </div>
           <div className="item2">Free-Chat</div>
           <div className="item3">
              <Info/>
              <LogOut/>
           </div>
          </div>
         
        </div>
        <div className="chat_content">
          <div className={show}><ListChat/></div>
          {id==="" ? 
           (<div className="chat_content_right_empty"></div>):
           (<div className={show2}><ZoneChat/></div>)
           }
          
        </div>
    </div>
  
  );
}

export default Chat;