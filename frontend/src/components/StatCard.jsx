import { motion } from "framer-motion"

function StatCard({title,value,icon,color,onClick}){

return(

<motion.div
whileHover={{scale:1.08}}
onClick={onClick}
style={{
background:color,
padding:"25px",
borderRadius:"14px",
width:"200px",
color:"white",
cursor:"pointer",
display:"flex",
flexDirection:"column",
justifyContent:"space-between",
boxShadow:"0px 8px 20px rgba(0,0,0,0.2)"
}}
>

<div style={{fontSize:"30px"}}>
{icon}
</div>

<div>

<h4>{title}</h4>

<h2 style={{marginTop:"5px"}}>{value}</h2>

</div>

</motion.div>

)

}

export default StatCard