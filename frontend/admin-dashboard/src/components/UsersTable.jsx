import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default function UsersTable(){

const [users,setUsers] = useState([])
const [search,setSearch] = useState("")

const fetchUsers = () => {
axios.get("http://127.0.0.1:8000/users")
.then(res=>{
setUsers(res.data)
})
}

useEffect(()=>{
fetchUsers()
},[])

const deleteUser = (id) => {

const confirmDelete = window.confirm("Are you sure?")

axios.delete(`http://127.0.0.1:8000/users/${id}`)
.then(()=>{
fetchUsers()
})

}

const filteredUsers = users.filter(user =>
user.name.toLowerCase().includes(search.toLowerCase())
)

return(

<div className="bg-white shadow rounded p-6">

<div className="flex justify-between mb-4">



<h2 className="text-xl font-semibold">
Users
</h2>

<Link
to="/create-user"
className="bg-green-500 text-white px-4 py-2 rounded"
>
Create User
</Link>


<input
type="text"
placeholder="Search user..."
className="border p-2 rounded"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

<table className="w-full text-center">

<thead>

<tr className="border-b">

<th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Role</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{filteredUsers.map(user=>(
<tr key={user.id} className="border-b">

<td>{user.id}</td>
<td>{user.name}</td>
<td>{user.email}</td>
<td>{user.role}</td>

<td className="space-x-2">

{/* <button className="bg-blue-500 text-white px-3 py-1 rounded">
Edit
</button> */}

<button
onClick={()=>deleteUser(user.id)}
className="bg-red-500 text-white px-3 py-1 rounded"
>
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