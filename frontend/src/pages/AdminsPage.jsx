import { useEffect, useState } from "react"
import axios from "axios"

function UsersPage(){

const [users,setUsers] = useState([])

useEffect(()=>{

axios.get("http://127.0.0.1:8000/admin/")
.then(res=>{
setUsers(res.data)
})

},[])

return(

<div style={{padding:"40px"}}>

<h2 style={{marginBottom:"20px"}}>Users</h2>

<table style={{
width:"100%",
borderCollapse:"collapse",
background:"white",
borderRadius:"10px",
overflow:"hidden",
boxShadow:"0px 5px 15px rgba(0,0,0,0.1)"
}}>

<thead style={{background:"#4facfe",color:"white"}}>

<tr>
<th style={{padding:"12px"}}>ID</th>
<th>Name</th>
<th>Email</th>
<th>Role</th>
<th>Actions</th>
</tr>

</thead>

<tbody>

{users.map(user=>(
<tr key={user.id} style={{textAlign:"center"}}>

<td style={{padding:"10px"}}>{user.id}</td>
<td>{user.name}</td>
<td>{user.email}</td>
<td>{user.role}</td>

<td>

<button style={{
background:"#10b981",
color:"white",
border:"none",
padding:"6px 12px",
marginRight:"8px",
borderRadius:"5px"
}}>
Edit
</button>

<button style={{
background:"#ef4444",
color:"white",
border:"none",
padding:"6px 12px",
borderRadius:"5px"
}}>
Delete
</button>

</td>

</tr>
))}

</tbody>

</table>

</div>

)

}

export default UsersPage