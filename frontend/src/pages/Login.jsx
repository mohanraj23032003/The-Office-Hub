import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserShield, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import Particles from "react-tsparticles";
import "./Login.css";

function Login(){

const navigate = useNavigate()

const [role,setRole] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const login = async(e)=>{

e.preventDefault()

try{

const res = await axios.post("http://127.0.0.1:8000/auth/login",{
email,
password
})

localStorage.setItem("token",res.data.access_token)
localStorage.setItem("role",res.data.role)

const r = res.data.role.toLowerCase()

if(r==="admin") navigate("/admin")
if(r==="staff") navigate("/staff-dashboard")
if(r==="student") navigate("/student-dashboard")

}catch(err){

alert("Invalid login")

}

}


return(

<div className="login-wrapper">

{/* Background Particles */}

<Particles
options={{
particles:{
number:{value:40},
size:{value:3},
move:{enable:true,speed:1}
}
}}
/>

<h1 className="portal-title">Learning Portal</h1>

<div className="role-container">

<div
className={`role-card ${role==="admin"?"active":""}`}
onClick={()=>setRole("admin")}
>

<FaUserShield className="role-icon"/>
<h3>Admin</h3>

</div>


<div
className={`role-card ${role==="staff"?"active":""}`}
onClick={()=>setRole("staff")}
>

<FaChalkboardTeacher className="role-icon"/>
<h3>Staff</h3>

</div>


<div
className={`role-card ${role==="student"?"active":""}`}
onClick={()=>setRole("student")}
>

<FaUserGraduate className="role-icon"/>
<h3>Student</h3>

</div>

</div>


{role && (

<form className="login-card" onSubmit={login}>

<h2>{role.toUpperCase()} Login</h2>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button className="login-btn">
Login
</button>

</form>

)}

</div>

)

}

export default Login