import { motion } from "framer-motion"

function StaffCard({staff,onClick}){

return(

<motion.div
whileHover={{scale:1.05}}
style={{
background:"white",
padding:"20px",
borderRadius:"12px",
width:"220px",
textAlign:"center",
boxShadow:"0px 6px 15px rgba(0,0,0,0.15)"
}}
>

<img
src={staff.photo || "https://via.placeholder.com/120"}
style={{
width:"120px",
height:"120px",
borderRadius:"50%",
objectFit:"cover",
marginBottom:"10px"
}}
/>

<h3>{staff.name}</h3>

<p style={{color:"#6b7280"}}>{staff.course}</p>

<p style={{color:"#0284c7"}}>⭐ {staff.experience} Years</p>

<button
onClick={onClick}
style={{
marginTop:"10px",
background:"#0284c7",
color:"white",
padding:"8px 14px",
border:"none",
borderRadius:"6px",
cursor:"pointer"
}}
>
Learn More
</button>

</motion.div>

)

}

export default StaffCard