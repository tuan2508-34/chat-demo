import "./listChat.css"
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
function ListUser() {
    const { user,setId,search,setChat,setEmpty,setInp,setShow,setShow2 } = ChatState();
    



    const BeginChat = (item) => {
      setShow("chat_content_left show")
      setShow2("chat_content_right show2")
      setInp("")
      let a=item.pic
      let b=item.name
      localStorage.setItem ('pic',a);
      localStorage.setItem ('name',b);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
       };
       axios.post(`http://localhost:5000/api/chat`,
      {
        userId:item._id
      },
      
      config)
      .then(res => {
        const persons = res.data;
          console.log(res.data);
          setChat(persons)
          setId(persons._id)
          setEmpty(true)
      
      })
      .catch(error => console.log(error));
      }    


   
    
  
return (
    <>
      {search.map((item)=>{
        return(
            <div className="mess_item" onClick={()=>BeginChat(item)}>
            <div className="chat_avatar" style={{ backgroundImage: `url(${item.pic})`} } ></div>
            <div className="info_chat" >
             <div>{item.name}</div>
            </div>
            </div>
        )
      })}
    </>
   
  
  );
}

export default ListUser;