import { useParams } from "react-router-dom"
import { useEffect,useState } from "react"
import axios from "axios"

function StaffDetails(){

const {id} = useParams()
const [staff,setStaff] = useState({})

useEffect(()=>{

axios.get(`http://127.0.0.1:8000/staff/${id}`)
.then(res=>{
setStaff(res.data)
})

},[])

return(

<div style={{padding:"40px"}}>

<img
src={staff.photo || "https://via.placeholder.com/150"}
style={{width:"150px",borderRadius:"50%"}}
/>

<h2>{staff.name}</h2>

<p>Email : {staff.email}</p>

<p>Course : {staff.course}</p>

<p>Experience : {staff.experience} Years</p>

<p>Achievements : {staff.achievements}</p>

</div>

)

}

export default StaffDetails