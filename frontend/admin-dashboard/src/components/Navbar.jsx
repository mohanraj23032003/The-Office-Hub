export default function Navbar(){

return(

<div className="bg-white shadow p-4 flex justify-between items-center">

<input
placeholder="Search..."
className="border px-3 py-2 rounded w-64"
/>

<div className="flex items-center gap-4">

<span className="cursor-pointer">🔔</span>

<img
src="https://i.pravatar.cc/40"
className="rounded-full"
/>

</div>

</div>

)

}