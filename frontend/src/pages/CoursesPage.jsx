import axios from "axios";
import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import "./CoursesPage.css";

function CoursesPage(){

const [courses,setCourses] = useState([])

const [form,setForm] = useState({
course_name:"",
duration:"",
description:""
})

const [editId,setEditId] = useState(null)


const loadCourses = ()=>{
axios.get("http://127.0.0.1:8000/course/")
.then(res=>{
setCourses(res.data)
})
}

useEffect(()=>{
loadCourses()
},[])


const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value})
}


const handleSubmit = ()=>{

if(editId){

axios.put(`http://127.0.0.1:8000/course/${editId}`,form)
.then(()=>{
setEditId(null)
setForm({
course_name:"",
duration:"",
description:""
})
loadCourses()
})

}else{

axios.post("http://127.0.0.1:8000/course/",form)
.then(()=>{
setForm({
course_name:"",
duration:"",
description:""
})
loadCourses()
})

}

}


const handleDelete = (id)=>{

axios.delete(`http://127.0.0.1:8000/course/${id}`)
.then(()=>{
loadCourses()
})

}


const handleEdit = (c)=>{

setEditId(c.id)

setForm({
course_name:c.course_name,
duration:c.duration,
description:c.description
})

}


return(

<AdminLayout>

<div className="course-container">

<h1 className="course-title">Course Management</h1>

<div className="course-form">

<input
name="course_name"
placeholder="Course Name"
value={form.course_name}
onChange={handleChange}
/>

<input
name="duration"
placeholder="Duration"
value={form.duration}
onChange={handleChange}
/>

<input
name="description"
placeholder="Description"
value={form.description}
onChange={handleChange}
/>

<button className="course-btn" onClick={handleSubmit}>
{editId ? "Update Course" : "Add Course"}
</button>

</div>


<table className="course-table">

<thead>

<tr>
<th>ID</th>
<th>Course</th>
<th>Duration</th>
<th>Description</th>
<th>Actions</th>
</tr>

</thead>


<tbody>

{courses.map(c=>(

<tr key={c.id} className="course-row">

<td>{c.id}</td>
<td>{c.course_name}</td>
<td>{c.duration}</td>
<td>{c.description}</td>

<td>

<button className="edit-btn" onClick={()=>handleEdit(c)}>
Edit
</button>

<button className="delete-btn" onClick={()=>handleDelete(c.id)}>
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

export default CoursesPage