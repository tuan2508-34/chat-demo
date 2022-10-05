import "./auth.css"
import { useState } from "react";
import axios from "axios";
import Avatar from "./avatar";
function Sign() {
    const [nex,setNex]=useState(true)
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [pass,setPass]=useState("")
    const [conf,setConf]=useState("")
    const [valName,setValName]=useState("")
    const [valEmail,setValEmail]=useState("")
    const [valPass,setValPass]=useState("")
    const [valConf,setValConf]=useState("")



    function Next(e){
        e.preventDefault()
        
        let atpos =email.indexOf("@");
        let dotpos =email.lastIndexOf(".");
        if(name!==""&&email!==""&&pass!==""&&pass!==""&&(atpos >= 1 || ( dotpos - atpos >= 2 ))&&conf===pass){
          
              axios.post('http://localhost:5000/api/user', 
              {
                name:name,
                email:email,
                password:pass,
              }
              )
              .then(function (response) {
                if(response.data.name===""){
                  setValEmail("! Email này đã được sử dụng")
                  setNex(true)
                }
                else if(response.data.name!==""){
                  setNex(false)
                }
              
              })
              .catch(function (error) {
                console.log(error);
              });
            
        }
        if(name===""||name===undefined){
            setValName("! Tên không được để trống")
        }
        else if(name!==""||name!==undefined){
            setValName("")
        }
        //
        if(email===""||email===undefined){
            setValEmail("! email không được để trống")
        }
        else if(atpos < 1 || ( dotpos - atpos < 2 )){
          setValEmail("! email phải có dạng xxx@xxx.xxx")
        }
        else if(email!==""||email!==undefined){
          setValEmail("")
        }
        //
        if(pass===""||pass===undefined){
            setValPass("! password không được để trống")
        }
        else if(pass!==""||pass!==undefined){
            setValPass("")
        }
        //
        if(conf===""||conf===undefined){
            setValConf("! không được để trống")
        }
        else if(conf!==pass){
            setValConf(" không trùng với password")
        }
        else if(pass!==""||pass!==undefined){
            setValConf("")
        }
    
        }
  if(nex===true){
  return ( 
    <div className="login_form">
    <form >
    <div class="form-group">
        <label for="exampleInputEmail1" className="form_title">User name</label>
        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter user name" onChange={(e)=>{setName(e.target.value)}}/>
        <div className="err">{valName}</div>
     </div>
     <div class="form-group">
        <label for="exampleInputEmail1" className="form_title">Email address</label>
        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
        <div className="err">{valEmail}</div>
     </div>
     <div class="form-group">
        <label for="exampleInputPassword1"className="form_title">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e)=>{setPass(e.target.value)}}/>
        <div className="err">{valPass}</div>
     </div>
     <div class="form-group">
        <label for="exampleInputPassword1"className="form_title">Confirm Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Confirm Password" onChange={(e)=>{setConf(e.target.value)}}/>
        <div className="err">{valConf}</div>
     </div>
 
  <button type="submit" class="btn btn-primary button" onClick={Next}>Next</button>
</form> 
</div>
  );
}
else if(nex===false){
    return(
        <Avatar name={name} email={email} pass={pass}/>
    )
    
}
}
export default Sign;







