import "./auth.css"
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { useNavigate } from "react-router";
import { ChatState } from "../../Context/ChatProvider";
function LogOut() {
  const { user,chat,setChat,id,setId } = ChatState();
const navigate = useNavigate();
  function out(){
    setId("")
    localStorage.removeItem("userInfo")
    navigate("/")
  }
  return(
     <div className="logout" onClick={out}>
        <RiLogoutCircleRLine/>
     </div>
  )
}
export default LogOut;







