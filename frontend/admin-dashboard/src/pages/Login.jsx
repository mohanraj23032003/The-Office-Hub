import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Login(){

const navigate = useNavigate()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const handleLogin = (e)=>{
e.preventDefault()

axios.post("http://127.0.0.1:8000/auth/login",{
email,
password
})
.then(res=>{

const role = res.data.role

if(role === "admin"){
navigate("/")
}

if(role === "staff"){
navigate("/staff")
}

if(role === "student"){
navigate("/students")
}

})
.catch(err=>{
alert("Invalid login")
})

}

return(

<div className="flex justify-center items-center h-screen">

<form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-80 space-y-4">

<h2 className="text-xl font-bold text-center">
Login
</h2>

<input
placeholder="Email"
className="border p-2 w-full"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
className="border p-2 w-full"
onChange={(e)=>setPassword(e.target.value)}
/>

<button className="bg-blue-500 text-white w-full py-2 rounded">
Login
</button>

</form>

</div>

)

}