import "./auth.css"
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { AiOutlineEye } from 'react-icons/ai';
function Login() {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [valEmail,setValEmail]=useState("")
    const [valPass,setValPass]=useState("")
    const [hide,setHide]=useState(true)
    const navigate = useNavigate();


    const Put= (e)=>{
        e.preventDefault()
        if(email!==""&&password!==""){
          
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
    
          const { data } = axios.post(
            "http://localhost:5000/api/user/login",
            { email, password },
            config
          )
  
          .then(function (response) {
           
            if(response.data.name===""){
              setValEmail("! Email hoặc mật khẩu không chính xác")
              setValPass("! Email hoặc mật khẩu không chính xác")
            }
            else if(response.data.name!==""){

              
              setValEmail("")
              setValPass("")
              localStorage.setItem("userInfo", JSON.stringify(response.data));
              navigate('/chat');
            }
          
          })
          .catch(function (error) {
            console.log(error);
          });
        
    }
        if(email===""||email===undefined){
            setValEmail("! email không được để trống")
        }
        else if(email!==""||email!==undefined){
          setValEmail("")
        }
        //
        if(password===""||password===undefined){
            setValPass("! password không được để trống")
        }
        else if(password!==""||password!==undefined){
            setValPass("")
        }
    
        }
return (
    <div className="login_form">
    <form >
     <div class="form-group">
        <label for="exampleInputEmail1" className="form_title">Email address</label>
        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
        <div className="err">{valEmail}</div>
     </div>
     <div class="form-group">
        <label for="exampleInputPassword1"className="form_title">Password</label>
        <div className="pass">
          <input type={hide ? "password":"text"} class="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
          <div className="hire" onClick={()=>setHide(!hide)}><AiOutlineEye/></div>
        </div>
        
        <div className="err">{valPass}</div>
     </div>
 
  <button type="submit" class="btn btn-primary button" onClick={Put}>Log in</button>
</form> 
</div>
  );
}

export default Login;