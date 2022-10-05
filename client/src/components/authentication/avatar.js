import "./auth.css"
import Nav from 'react-bootstrap/Nav';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Avatar({name,email,pass}) {
  const listBoy=[
    "https://chiase24.com/wp-content/uploads/2022/02/Tong-hop-hinh-anh-avatar-de-thuong-lam-hinh-dai-dien-dep-nhat-18.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnjtBcIbiI7vdu0t1zAXEikbjTiaQo2RdGmK5CsY6rLaocCeUGmIN_TGJ6RVJ18gyvMQ4&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvrhO9osgx2fFbDz0Kilr_tRcmy_nJrGkm1Q&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyO6u-v6lfrA7tiKfk6ttdasV4P-KsAhFp9A&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG5s-pnpsa-iT5R9xesoXWpOfFwNhRFIzQxQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG1-621nJYDepvQT6dWmshbmUFdaOIuoFatA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS24XJ7ttiXzw5KsxCDQFGi6yND6g23FiDEyQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhV-9iLjO2NODNtGKOO0OWhmKW2dzIXFMx6A&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuq7IVKDcNcjrHmCTNrG9Z6GpsCzYPjw1o3g&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXZ0sxm45dg2vLRROH6Gl0L5qcfWsPT9UN5Q&usqp=CAU"
  ]

  const listGirl=[
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiepU9UnBt8ceyiWzOzmPmNo3mTh44bbVimQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuwCxE3NsLRwq2s_wrezM7AwtZogYnOBzlOQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR3_IxngpBd5BqZO2wU27rok4ru-b9ZfyXhw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcVMG7ZjbY_IAk46FuxjhUeRM8s7GZHeLRZA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmL29UDz83XgjMXhY1QuRJkgatvtbM1nonBw&usqp=CAU",
    "https://www.dungplus.com/wp-content/uploads/2019/10/anh-avatar-dep-nhat.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqvLb3JbOoFIpgI2fX3UzwE1xITm7zJ60E-Vk5yK377vjODVZXApqH2I_ZCJRfmL19U6g&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJklu6-gINrM9QDs2kx2mNFJd8oEBZ8GOVv0D3wz6Gmukdp_i-c4wjkG6G5epC1qUXXk4&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBA-rF2EDGHnv5mJRWKvkdmlrWfr0_pxZrbGfm9jgabTnOAgdNrFMIJ5_zH0dI7daJMbg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzykMMLzMgjQ2P_W6WaVk5o3oK66ayD55Dp9p_Mnuizv-AJd4q7H9xZFTmARq6q8-x87Y&usqp=CAU"
  ]
  let init=[]
  const navigate = useNavigate();
  const [sex,setSex]=useState(init)
  const [pic,setPic]=useState("https://1.bp.blogspot.com/-CV8fOXMMw60/YZ-UJ4X9sAI/AAAAAAAACMc/2Svet97exjgNdJ9CeTKUU3OuA-mnCQEzwCLcBGAsYHQ/s595/3a.jpg")

  const chooseImg=(item)=>{
    setPic(item)
  }
  const Complete= async (item)=>{
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://localhost:5000/api/user/register",
      {
        name,
        email,
        pass,
        pic,
      },
      config
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
    navigate('/chat');
  }


  return ( 
    <div className="main_avatar">
    <div className="avatar_sex">
       <div className="avatar_sex_title">choose avatar</div>
       <Nav variant="pills" className="flex-row">
            <Nav.Item className='' >
              <Nav.Link eventKey="first" className='' onClick={()=>{setSex(listBoy)}}>Nam</Nav.Link>
            </Nav.Item>
            <Nav.Item className='' >
              <Nav.Link eventKey="second" className='' onClick={()=>{setSex(listGirl)}}>Nữ</Nav.Link>
            </Nav.Item>
        </Nav>

    </div>

     
     <div className="list_image">
        {sex.map((item,index)=>{
            return(
                <>
                   <div style={{ backgroundImage: `url(${item})`}} className="avatar_image" onClick={()=>chooseImg(item)}/>
                </>
            )
            
        })}
     </div>
     <div className="list_image kk">
        <div style={{ backgroundImage: `url(${pic})`} } className="avatar_image"></div>
       
     </div>
     <button type="submit" class="btn btn-primary button" onClick={Complete}>!Complete</button>
     </div>
  )
}
export default Avatar;