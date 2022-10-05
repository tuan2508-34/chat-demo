import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {

  const [user, setUser] = useState();
  const [chat, setChat] = useState([]);
  const [id, setId] = useState();
  const [empty, setEmpty] = useState(false);
  const [search, setSearch] = useState([]);
  const [inp,setInp]=useState()
  const [code,setCode]=useState()
  const [last,setLast]=useState()
  const [show,setShow]=useState("chat_content_left")
  const [show2,setShow2]=useState("chat_content_right")
  
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo||userInfo===undefined) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        user, 
        setUser,
        chat,
        setChat,
        id,
        setId,
        empty,
        setEmpty,
        search,
        setSearch,
        inp,
        setInp,
        code,
        setCode,
        last,
        setLast,
        show,
        setShow,
        show2,
        setShow2
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
