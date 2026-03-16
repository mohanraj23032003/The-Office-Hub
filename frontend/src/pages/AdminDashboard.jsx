import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import Sidebar from "../components/Sidebar"
import StatCard from "../components/StatCard"

import { FaUsers, FaChalkboardTeacher, FaUserGraduate, FaBook } from "react-icons/fa"

function AdminDashboard(){

const navigate = useNavigate()

const [stats,setStats] = useState({
admins:0,
staff:0,
students:0,
courses:0,
batches:0
})

useEffect(()=>{

axios.get("http://127.0.0.1:8000/admin/")
.then(res=>{
setStats(prev=>({...prev, admins:res.data.length}))
})

axios.get("http://127.0.0.1:8000/staff/")
.then(res=>{
setStats(prev=>({...prev, staff:res.data.length}))
})

axios.get("http://127.0.0.1:8000/students/")
.then(res=>{
setStats(prev=>({...prev, students:res.data.length}))
})

axios.get("http://127.0.0.1:8000/course/")
.then(res=>{
setStats(prev=>({...prev, courses:res.data.length}))
})

axios.get("http://127.0.0.1:8000/batch/")
.then(res=>{
setStats(prev=>({...prev, batches:res.data.length}))
})

},[])

return(

<div style={{
display:"flex",
background:"linear-gradient(135deg,#87CEEB,#4facfe)",
minHeight:"100vh"
}}>

<Sidebar/>

<div style={{
padding:"40px",
display:"flex",
gap:"20px",
flexWrap:"wrap"
}}>

<StatCard
title="Admins"
value={stats.admins}
icon={<FaUsers/>}
color="linear-gradient(135deg,#4facfe,#00f2fe)"
onClick={()=>navigate("/admin-list")}
/>

<StatCard
title="Staff"
value={stats.staff}
icon={<FaChalkboardTeacher/>}
color="linear-gradient(135deg,#43e97b,#38f9d7)"
onClick={()=>navigate("/staff-list")}
/>

<StatCard
title="Students"
value={stats.students}
icon={<FaUserGraduate/>}
color="linear-gradient(135deg,#fa709a,#fee140)"
onClick={()=>navigate("/students-list")}
/>

<StatCard
title="Courses"
value={stats.courses}
icon={<FaBook/>}
color="linear-gradient(135deg,#667eea,#764ba2)"
onClick={()=>navigate("/course-list")}
/>

<StatCard
title="Batches"
value={stats.batches || 0}
icon={<FaBook/>}
color="linear-gradient(135deg,#667eea,#764ba2)"
onClick={()=>navigate("/batch-list")}
/>

</div>

</div>

)

}

export default AdminDashboard