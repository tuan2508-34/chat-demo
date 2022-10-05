import "./zoneChat.css"
import { useState,useEffect,useRef } from "react";
import { AiOutlineSend } from 'react-icons/ai';
import { AiOutlineRollback } from 'react-icons/ai';

import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import io from "socket.io-client";


const ENDPOINT = "http://localhost:5000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
let socket;
function ZoneChat() {
  const { user,chat,id,empty,inp,setInp,setCode,setLast,setShow,setShow2} = ChatState();
  const [send,setSend]=useState([])
  const item1 = useRef(0);
  const item2 = useRef(null);

  ///
  useEffect(() => {
    socket = io(ENDPOINT);
    
  }, []);
  ///
  useEffect(() => {
    if(chat.chatName=== 'sender'){
      setSend([])
    }
    else {
      setSend(chat.map((item)=>{return {
        content:item.content,
        id:item.sender._id
        }}))
      }
  }, [chat]);
  ///
  const InpText=(e)=>{
     setInp(e.target.value)
  }
  ///
  const Back=()=>{
    setShow("chat_content_left")
    setShow2("chat_content_right")
 }
  ////
  const Send = async () => {
    socket.emit("gui",  {inp,id});
    socket.emit("add",  {chat});
    socket.on("nhan",(bien)=>{
      let a=[...send,...[{
        content:bien,
        id:user._id
    }]]
      setSend(a)
      setLast(inp)
    })
    socket.on("id",(bien)=>{
      setCode(bien)
    })
    setInp("")
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`http://localhost:5000/api/message`, 
      {
        content:inp,
        chatId:id
      },
      config);
     
    } catch (error){
    }
  };

  if(send.length===0&&empty===false){
    return (
      <div className="zoneChat_main">
      <div className="zoneChat_container1">
      <div className="zoneChat_title" >
      <div className="back" onClick={Back}><AiOutlineRollback/></div>
        </div>
      </div>
      </div>
    );
  }
  else if(send.length>=1||empty===true){
  let pic=localStorage.getItem('pic')
  let name=localStorage.getItem('name')
  return (
      <div className="zoneChat_main">
        <div className="zoneChat_container">
             <div className="zoneChat_title" >
               <div className="zoneChat_name">
                    <div className="zoneChat_name_pic" style={{ backgroundImage: `url(${pic})`} }  ></div>
                    <div className="zoneChat_name_name">{name}</div>
               </div>
               <div className="back" onClick={Back}><AiOutlineRollback/></div>
             </div>
             <div className="zoneChat_chat" ref={item1}>
             <div className="zoneChat_chat_item" ref={item2}>
              { send.length>=1 ?   ( send.map((item)=>{
                return(
                  <div className="">
                     {item.id===user._id ?
                     
                    (<div className="zoneChat_chat_item_user">
                      <span >{item.content}</span>
                      </div>):
                    (<div className="zoneChat_chat_item_friend">
                      <span >{item.content}</span>
                      </div>)
                    
                    }
                  </div>
                )
              })):(<div></div>)}
              </div>
             </div>
             </div>
             <div className="zoneChat_chat_text">
                 <input className="zoneChat_chat_text_input" onChange={InpText} value={inp}/>
                 <div className="zoneChat_chat_text_send" onClick={Send}>
                     <AiOutlineSend/>
                 </div>
               </div>
      </div>
    
    )};
  
}

export default ZoneChat;