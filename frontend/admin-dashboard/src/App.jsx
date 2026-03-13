import { BrowserRouter, Routes, Route } from "react-router-dom"

import AdminLayout from "./layout/AdminLayout"
import Dashboard from "./pages/Dashboard"
import Users from "./pages/Users"
import Students from "./pages/Students"
import Staff from "./pages/Staff"
import CreateUser from "./pages/CreateUser"
import Login from "./pages/Login"

function App(){

return(

<BrowserRouter>

<AdminLayout>

<Routes>

<Route path="/" element={<Dashboard/>} />
<Route path="/users" element={<Users/>} />
<Route path="/students" element={<Students/>} />
<Route path="/staff" element={<Staff/>} />
<Route path="/create-user" element={<CreateUser/>}/>
<Route path="/login" element={<Login/>} />


</Routes>

</AdminLayout>

</BrowserRouter>

)

}

export default App