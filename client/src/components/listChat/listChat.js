import "./listChat.css"
import ItemChat from "./itemChat";
function ListChat() {
return (
    <div className="listChat_main">
        <div className="listchat_nav">
            <div className="listchat_nav_title">My Chats</div>
         
        </div>
        <div className="listchat_nav_content">
           <ItemChat/>
        </div>
    </div>
  
  );
}

export default ListChat;