import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function CreateUser(){

const navigate = useNavigate()

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [role,setRole] = useState("")

const handleSubmit = (e)=>{
e.preventDefault()

axios.post("http://127.0.0.1:8000/users/",{
name:name,
email:email,
password:password,
role:role
})
.then(()=>{
alert("User created successfully")

navigate("/")
})
.catch(err=>{
console.log(err)
})

}

return(

<div className="bg-white p-6 rounded shadow">

<h2 className="text-xl font-bold mb-4">
Create User
</h2>

<form onSubmit={handleSubmit} className="space-y-4">

<input
className="border p-2 w-full"
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
className="border p-2 w-full"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
className="border p-2 w-full"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<select
className="border p-2 w-full"
value={role}
onChange={(e)=>setRole(e.target.value)}
>

<option value="">Select Role</option>
<option value="admin">Admin</option>
<option value="staff">Staff</option>
<option value="student">Student</option>

</select>

<button className="bg-blue-500 text-white px-4 py-2 rounded">
Create User
</button>

</form>

</div>

)

}