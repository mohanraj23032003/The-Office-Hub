import axios from "axios";
import { useEffect, useState } from "react";
import "./StaffPage.css";

function StaffPage() {

const [staff, setStaff] = useState([]);

const [search, setSearch] = useState("");

const [form, setForm] = useState({
  name:"",
  email:"",
  phone:"",
  password:"",
  experience:"",
  achievements:"",
  course:""
});

const [editId, setEditId] = useState(null);


const loadStaff = () => {

axios.get(`http://127.0.0.1:8000/staff/?search=${search}`)
.then((res)=>{
setStaff(res.data)
})

}

useEffect(()=>{
 loadStaff()
},[search])


const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value})
}

  const handleSubmit = () => {
    const payload = { ...form };

    if (editId) {
      axios.put(`http://127.0.0.1:8000/staff/${editId}/`, payload).then(() => {
        setEditId(null);
        setForm({
          name: "",
          email: "",
          phone:"",
          password: "",
          experience: "",
          achievements: "",
          course: "",
        });
        loadStaff();
      });
    } else {
      axios.post("http://127.0.0.1:8000/staff/", payload).then(() => {
        setForm({
          name: "",
          email: "",
          phone:"",
          password: "",
          experience: "",
          achievements: "",
          course: "",
        });
        loadStaff();
      });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/staff/${id}/`).then(() => {
      loadStaff();
    });
  };

  const handleEdit = (s) => {
    setEditId(s.id);
    setForm({
      name: s.name,
      email: s.email,
      phone:"",
      password: "",
      experience: s.experience || "",
      achievements: s.achievements || "",
      course: s.course || "",
    });
  };

  return (
    <div className="staff-container">
      <h1 className="title">Staff Management</h1>

      <input
        placeholder="Search staff..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        style={{
        padding:"10px",
        marginBottom:"20px",
        borderRadius:"6px",
        border:"1px solid #ccc"
        }}
      />

      {/* Form */}

      <div className="form-card">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <input
          name="experience"
          placeholder="Experience"
          value={form.experience}
          onChange={handleChange}
        />
        <input
          name="achievements"
          placeholder="Achievements"
          value={form.achievements}
          onChange={handleChange}
        />
        <input
          name="course"
          placeholder="Course"
          value={form.course}
          onChange={handleChange}
        />

        <button onClick={handleSubmit} className="main-btn">
          {editId ? "Update Staff" : "Add Staff"}
        </button>
      </div>

      {/* Table */}

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Experience</th>
              <th>Achievements</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {staff.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.experience}</td>
                <td>{s.achievements}</td>
                <td>{s.course}</td>

                <td>
                  <button className="edit-btn" onClick={() => handleEdit(s)}>
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(s.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StaffPage;
