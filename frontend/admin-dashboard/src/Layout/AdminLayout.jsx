import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

export default function AdminLayout({children}) {

return (
<div className="flex bg-gray-100 min-h-screen w-full">

<Sidebar/>

<div className="flex-1 flex flex-col w-full">

<Navbar/>

<div className="flex-1 p-6 w-full">
{children}
</div>

</div>

</div>
)

}