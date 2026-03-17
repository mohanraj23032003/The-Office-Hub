import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserGraduate, FaBook, FaClipboardCheck } from "react-icons/fa";
import "./StudentDashboard.css";

function StudentDashboard() {

  const [student,setStudent] = useState(null)
  const [topics,setTopics] = useState([])

  const token = localStorage.getItem("token")

  useEffect(()=>{

    axios.get("http://127.0.0.1:8000/students/me",{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    .then(res=>{
      setStudent(res.data)
    })

  },[])


  useEffect(()=>{

    if(student){

      axios.get(
        `http://127.0.0.1:8000/topics/student/${student.batch_id}/${student.course_id}`
      )
      .then(res=>{
        setTopics(res.data)
      })

    }

  },[student])


  const logout = ()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    window.location.href="/"
  }


  if(!student){
    return <h2 style={{textAlign:"center"}}>Loading...</h2>
  }

  const completed = topics.filter(t=>t.completed).length
  const progress = topics.length ? Math.round((completed/topics.length)*100) : 0


return(


<div className="dashboard">

<h1 className="dashboard-title">Student Dashboard</h1>

{/* Cards */}

<div className="cards">

<div className="card profile-card">
<FaUserGraduate className="icon"/>
<h3>{student.name}</h3>
<p>{student.email}</p>
<p>Batch : {student.batch_id}</p>
</div>

<div className="card course-card">
<FaBook className="icon"/>
<h3>Course</h3>
<p>{student.course_id}</p>
</div>

<div className="card progress-card">
<FaClipboardCheck className="icon"/>
<h3>Progress</h3>
<p>{progress}% Completed</p>
</div>

</div>


{/* Progress Bar */}

<div className="progress-section">

<h3>Course Progress</h3>

<div className="progress-bar">

<div
className="progress-fill"
style={{width:`${progress}%`}}
></div>

</div>

<p>{completed} / {topics.length} Topics Completed</p>

</div>


{/* Topics */}

<div className="topics">

<h3>Course Topics</h3>

{topics.map((t,i)=>(

<div key={i} className="topic-row">

<span>{t.topic}</span>

{t.completed
? <span className="completed">✔ Completed</span>
: <span className="pending">Pending</span>
}

</div>

))}

</div>


<button className="logout-btn" onClick={logout}>
Logout
</button>

</div>

)

}

export default StudentDashboard