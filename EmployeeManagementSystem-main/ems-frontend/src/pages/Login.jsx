import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import API from "../api/api";
import "./Login.css";

export default function Login(){

const navigate = useNavigate();

const [username,setUsername] = useState("");
const [password,setPassword] = useState("");

const [errors,setErrors] = useState({});

const validateField = (field,value)=>{

let newErrors={...errors};

if(field==="username"){
if(!value){
newErrors.username="Username is required";
}else{
delete newErrors.username;
}
}

if(field==="password"){
if(!value){
newErrors.password="Password is required";
}else{
delete newErrors.password;
}
}

setErrors(newErrors);

};

const handleLogin = async ()=>{

if(!username || !password){
validateField("username",username);
validateField("password",password);
return;
}

try{

const res = await API.post("/auth/login",{
username,
password
});

localStorage.setItem("token",res.data.data);

navigate("/dashboard");

}catch(error){

alert(error.response?.data?.message || "Login Failed");

}

};

return(

<div className="login-page">

<div className="login-overlay"></div>

<div className="login-container">

{/* Illustration */}

<div className="login-image">

<img
src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
alt="login"
/>

</div>

{/* Login Form */}

<div className="login-form">

<h2 className="login-title">
Employee Management System
</h2>

<label style={{color:"#d1d5db"}}>Username</label>

<div className="input-group">

<FaUser/>

<input
className="login-input"
value={username}
onChange={(e)=>setUsername(e.target.value)}
onBlur={(e)=>validateField("username",e.target.value)}
placeholder="Enter username"
/>

</div>

{errors.username && (
<p className="error-msg">{errors.username}</p>
)}

<label style={{color:"#d1d5db"}}>Password</label>

<div className="input-group">

<FaLock/>

<input
type="password"
className="login-input"
value={password}
onChange={(e)=>setPassword(e.target.value)}
onBlur={(e)=>validateField("password",e.target.value)}
placeholder="Enter password"
/>

</div>

{errors.password && (
<p className="error-msg">{errors.password}</p>
)}

<button
className="login-btn"
onClick={handleLogin}
>
Login
</button>

</div>

</div>

</div>

);

}