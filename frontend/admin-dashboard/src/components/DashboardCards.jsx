import { useEffect, useState } from "react"
import axios from "axios"

export default function DashboardCards(){

const [stats,setStats] = useState({
users:0,
staff:0,
students:0,
courses:0
})

useEffect(()=>{

axios.get("http://127.0.0.1:8000/dashboard/stats")
.then(res=>{
setStats(res.data)
})
.catch(err=>{
console.log(err)
})

},[])

const cards = [
{title:"Total Users",value:stats.users},
{title:"Total Staff",value:stats.staff},
{title:"Students",value:stats.students},
{title:"Courses",value:stats.courses}
]

return(

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">

{cards.map((card,index)=>(
<div
key={index}
className="bg-white p-6 rounded shadow"
>

<h3 className="text-gray-500">
{card.title}
</h3>

<p className="text-3xl font-bold mt-2">
{card.value}
</p>

</div>
))}

</div>

)

}