import "./listChat.css"
import { useState,useEffect } from "react";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import ListUser from "./listUser";

function ItemChat() {
  const { user,setChat,setId,search,setEmpty,setInp,code,last,setShow,setShow2} = ChatState();
  
  const [load, setLoad] =useState(true);
  const [listdata, setListdata] =useState([]);
  const [local, setLocal] =useState([]);
  const BeginChat = async (item) => {
      setShow("chat_content_left show")
      setShow2("chat_content_right show2")
      setInp("")
      let a=item.pic
      let b=item.name
    localStorage.setItem ('pic',a);
    localStorage.setItem ('name',b);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`http://localhost:5000/api/message/${item.id}`, config);
      setChat(data)
      setId(item.id)
      setEmpty(true)
    } catch (error){}
  };

  const handleSearch  = async () => {


    try {
   
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`http://localhost:5000/api/chat`, config);
     
      setLocal(data)
    } catch (error){
    }
  };


  useEffect(() => {
    handleSearch()
    },[]);

  useEffect(() => {
    handleSearch()
    
    },[user]);

  

setTimeout(()=>{setLoad(false)},1500)

function Chon({item}){
  return <div className="mess_item" onClick={()=>BeginChat(item)}>
         <div className="chat_avatar" style={{ backgroundImage: `url(${item.pic})`}}></div>
         <div className="info_chat" >
             <div>{item.name}</div>
             <div className="info_chat_lastMess">{
             item.id===code ? last:item.last}</div>
         </div>
         </div>
  }



useEffect(() => {
  if(local.length>0){
    let d=local.map((item)=>{
        let id=item._id
        let name= item.users[0]._id===user._id ? item.users[1].name : item.users[0].name 
        let pic= item.users[0]._id===user._id ? item.users[1].pic : item.users[0].pic 
        let last=item.latestMessage!==undefined ? item.latestMessage.content:""
        return  {id,name,pic,last} 
    })
    
    
    setListdata(d)
  }
  },[local]);

  

if(search.length>=1){
  return (
    <div className="list_mess">

    <ListUser/>
    </div>
  
  );
}
else if(search.length===0){
return (
    <div className="list_mess">
      {load ? 
    (<div className="loading">
       <div className="loading_pic"></div>
    </div>) :
    (<div>
      {listdata.map((item)=>{
        return(
          <>
             <Chon item={item}/>
          </>
        )
      })}
    </div>)    
    }
    </div>
  
  );
}
}

export default ItemChat;