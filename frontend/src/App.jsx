import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login"

import AdminDashboard from "./pages/AdminDashboard"
import StaffDashboard from "./pages/StaffDashboard"
import StudentDashboard from "./pages/StudentDashboard"

import AdminsPage from "./pages/AdminsPage"
import StaffPage from "./pages/StaffPage"
import StaffDetails from "./pages/StaffDetails"

import StudentsPage from "./pages/StudentsPage"
import CoursesPage from "./pages/CoursesPage"
import BatchPage from "./pages/BatchList"


function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Login/>}/>

<Route
 path="/admin"
 element={
   <ProtectedRoute role="admin">
     <AdminDashboard/>
   </ProtectedRoute>
 }
/>

<Route
 path="/staff-dashboard"
 element={
   <ProtectedRoute role="staff">
     <StaffDashboard/>
   </ProtectedRoute>
 }
/>

<Route
 path="/student-dashboard"
 element={
   <ProtectedRoute role="student">
     <StudentDashboard />
   </ProtectedRoute>
 }
/>

<Route path="/staff-details/:id" element={<StaffDetails/>}/>

<Route path="/students-list" element={<StudentsPage/>}/>
<Route path="/staff-list" element={<StaffPage/>}/>
<Route path="/course-list" element={<CoursesPage/>}/>

<Route path="/batch-list" element={<BatchPage/>}/>
<Route path="/admin-list" element={<AdminsPage/>}/>

</Routes>

</BrowserRouter>

)

}

export default App