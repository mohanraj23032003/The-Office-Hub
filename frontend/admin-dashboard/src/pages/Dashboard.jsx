import DashboardCards from "../components/DashboardCards"
import UsersTable from "../components/UsersTable"

export default function Dashboard(){

return(

<div className="w-full">
<div className="space-y-8">

<h1 className="text-2xl font-bold">
Admin Dashboard
</h1>

<DashboardCards/>

<UsersTable/>

</div>
</div>

)

}