import { Link, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaBook,
  FaLayerGroup,
  FaChalkboardTeacher,
  FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div
      style={{
        width: "230px",
        height: "100vh",
        background: "#0ea5e9",
        color: "white",
        padding: "25px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >

      {/* TOP MENU */}

      <div>

        <h2 style={{ marginBottom: "30px" }}>Admin Panel</h2>

        <ul style={{ listStyle: "none", padding: "0" }}>

          <li style={{ marginBottom: "20px" }}>
            <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>
              <FaUsers /> Dashboard
            </Link>
          </li>

          <li style={{ marginBottom: "20px" }}>
            <Link
              to="/staff-list"
              style={{ color: "white", textDecoration: "none" }}
            >
              <FaChalkboardTeacher /> Staff
            </Link>
          </li>

          <li style={{ marginBottom: "20px" }}>
            <Link
              to="/course-list"
              style={{ color: "white", textDecoration: "none" }}
            >
              <FaBook /> Courses
            </Link>
          </li>

          <li style={{ marginBottom: "20px" }}>
            <Link
              to="/batch-list"
              style={{ color: "white", textDecoration: "none" }}
            >
              <FaLayerGroup /> Batches
            </Link>
          </li>

        </ul>

      </div>


      {/* LOGOUT BUTTON */}

      <button
        onClick={logout}
        style={{
          background: "#ef4444",
          color: "white",
          border: "none",
          padding: "12px",
          borderRadius: "8px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}
      >
        <FaSignOutAlt />
        Logout
      </button>

    </div>
  );
}

export default Sidebar;