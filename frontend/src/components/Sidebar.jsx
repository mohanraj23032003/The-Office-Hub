import { Link } from "react-router-dom";
import {
  FaUsers,
  FaBook,
  FaLayerGroup,
  FaChalkboardTeacher,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div
      style={{
        width: "230px",
        height: "100vh",
        background: "#0ea5e9",
        color: "white",
        padding: "25px",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>Admin Panel</h2>

      <ul style={{ listStyle: "none", padding: "0" }}>
        <li style={{ marginBottom: "20px" }}>
          <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>
            <FaUsers /> Dashboard
          </Link>
        </li>

        <li style={{ marginBottom: "20px" }}>
          <Link
            to="/staff-dashboard"
            style={{ color: "white", textDecoration: "none" }}
          >
            <FaChalkboardTeacher /> Staff
          </Link>
        </li>

        <li style={{ marginBottom: "20px" }}>
          <Link
            to="/courses"
            style={{ color: "white", textDecoration: "none" }}
          >
            <FaBook /> Courses
          </Link>
        </li>

        <li style={{ marginBottom: "20px" }}>
          <Link
            to="/batches"
            style={{ color: "white", textDecoration: "none" }}
          >
            <FaLayerGroup /> Batches
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
