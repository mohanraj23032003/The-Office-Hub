import axios from "axios";
import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import "./BatchPage.css";

function BatchPage(){

const [batches,setBatches] = useState([])
const [staff,setStaff] = useState([])

const [form,setForm] = useState({
batch_name:"",
start_time:"",
end_time:"",
staff_id:""
})

const [editId,setEditId] = useState(null)


const loadData = ()=>{

axios.get("http://127.0.0.1:8000/batch/")
.then(res=>{
setBatches(res.data)
})

axios.get("http://127.0.0.1:8000/staff/")
.then(res=>{
setStaff(res.data)
})

}

useEffect(()=>{
loadData()
},[])


const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value})
}


const handleSubmit = ()=>{

if(editId){

axios.put(`http://127.0.0.1:8000/batch/${editId}`,form)
.then(()=>{
setEditId(null)
setForm({
batch_name:"",
start_time:"",
end_time:"",
staff_id:""
})
loadData()
})

}else{

axios.post("http://127.0.0.1:8000/batch/",form)
.then(()=>{
setForm({
batch_name:"",
start_time:"",
end_time:"",
staff_id:""
})
loadData()
})

}

}


const handleDelete = (id)=>{

axios.delete(`http://127.0.0.1:8000/batch/${id}`)
.then(()=>{
loadData()
})

}


const handleEdit = (b)=>{

setEditId(b.id)

setForm({
batch_name:b.batch_name,
start_time:b.start_time,
end_time:b.end_time,
staff_id:b.staff_id
})

}


return(

<AdminLayout>

<div className="batch-container">

<h1>Batch Management</h1>

<div className="batch-form">

<input
name="batch_name"
placeholder="Batch Name"
value={form.batch_name}
onChange={handleChange}
/>

<input
type="time"
name="start_time"
value={form.start_time}
onChange={handleChange}
/>

<input
type="time"
name="end_time"
value={form.end_time}
onChange={handleChange}
/>

<select
name="staff_id"
value={form.staff_id}
onChange={handleChange}
>

<option value="">Select Staff</option>

{staff.map(s=>(
<option key={s.id} value={s.id}>
{s.name}
</option>
))}

</select>

<button onClick={handleSubmit}>
{editId ? "Update Batch" : "Add Batch"}
</button>

</div>


<table className="batch-table">

<thead>

<tr>
<th>ID</th>
<th>Batch</th>
<th>Start Time</th>
<th>End Time</th>
<th>Staff</th>
<th>Actions</th>
</tr>

</thead>


<tbody>

{batches.map(b=>(

<tr key={b.id}>

<td>{b.id}</td>
<td>{b.batch_name}</td>
<td>{b.start_time}</td>
<td>{b.end_time}</td>
<td>{b.staff_id}</td>

<td>

<button className="edit-btn" onClick={()=>handleEdit(b)}>
Edit
</button>

<button className="delete-btn" onClick={()=>handleDelete(b)}>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</AdminLayout>

)

}

export default BatchPage