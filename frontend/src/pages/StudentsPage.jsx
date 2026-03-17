import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StaffPage.css";
import AdminLayout from "../layout/AdminLayout";

function StudentsPage() {

  const navigate = useNavigate();

  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    course_id: "",
    batch_id: "",
    staff_id: ""
  });

  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  // ---------------------------
  // Load Students
  // ---------------------------
  const loadStudents = () => {
    axios
      .get(`http://127.0.0.1:8000/students/?search=${search}`)
      .then((res) => {
        setStudents(res.data);
      });
  };

  useEffect(() => {
    loadStudents();
  }, [search]);

  // ---------------------------
  // Handle Form Change
  // ---------------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------------------
  // Submit (Create / Update)
  // ---------------------------
  const handleSubmit = () => {

    if (editId) {

      axios
        .put(`http://127.0.0.1:8000/students/${editId}`, form)
        .then(() => {
          setEditId(null);
          setForm({
            name: "",
            email: "",
            phone: "",
            password: "",
            course_id: "",
            batch_id: "",
            staff_id: ""
          });
          loadStudents();
        });

    } else {

      axios
        .post("http://127.0.0.1:8000/students/", form)
        .then(() => {
          setForm({
            name: "",
            email: "",
            phone: "",
            password: "",
            course_id: "",
            batch_id: "",
            staff_id: ""
          });
          loadStudents();
        });

    }
  };

  // ---------------------------
  // Delete Student
  // ---------------------------
  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/students/${id}`)
      .then(() => {
        loadStudents();
      });
  };

  // ---------------------------
  // Edit Student
  // ---------------------------
  const handleEdit = (s) => {

    setEditId(s.id);

    setForm({
      name: s.name,
      email: s.email,
      phone: s.phone,
      password: "",
      course_id: s.course_id,
      batch_id: s.batch_id,
      staff_id: s.staff_id
    });
  };

  return (

    <div className="staff-container">

      <h1 className="title">Student Management</h1>

      {/* SEARCH */}

      <input
        placeholder="Search student"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px", width: "250px" }}
      />

      {/* FORM */}

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
          name="course_id"
          placeholder="Course ID"
          value={form.course_id}
          onChange={handleChange}
        />

        <input
          name="batch_id"
          placeholder="Batch ID"
          value={form.batch_id}
          onChange={handleChange}
        />

        <input
          name="staff_id"
          placeholder="Staff ID"
          value={form.staff_id}
          onChange={handleChange}
        />

        <button onClick={handleSubmit} className="main-btn">
          {editId ? "Update Student" : "Add Student"}
        </button>

       <button
          onClick={() => navigate("/admin")}
          className="back-btn"
          >
          Back to Dashboard
       </button>

      </div>

      {/* TABLE */}

      <div className="table-card">

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Course ID</th>
              <th>Batch ID</th>
              <th>Staff ID</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {students.map((s) => (

              <tr key={s.id}>

                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.phone}</td>
                <td>{s.course_id}</td>
                <td>{s.batch_id}</td>
                <td>{s.staff_id}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(s)}
                  >
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

export default StudentsPage;