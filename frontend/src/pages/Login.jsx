import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {

const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const login = async (e) => {
e.preventDefault();

try {

const res = await axios.post("http://127.0.0.1:8000/auth/login", {
email,
password,
});

const role = res.data?.role?.toLowerCase();

localStorage.setItem("token", res.data.access_token);
localStorage.setItem("role", role);

console.log(res.data);

if (role === "admin") navigate("/admin");
else if (role === "staff") navigate("/staff-dashboard");
else if (role === "student") navigate("/student-dashboard");

} catch (err) {

console.log("Login Error:", err.response?.data);
alert("Invalid email or password");

}
};

return (

<div
style={{
height: "100vh",
display: "flex",
justifyContent: "center",
alignItems: "center",
background: "linear-gradient(135deg,#667eea,#764ba2)",
}}
>

<motion.form
initial={{ opacity: 0, y: -40 }}
animate={{ opacity: 1, y: 0 }}
style={{
background: "white",
padding: "40px",
borderRadius: "10px",
width: "300px",
}}
onSubmit={login}
>

<h2 style={{ textAlign: "center" }}>Login</h2>

<input
placeholder="Email"
value={email}
autoComplete="email"
onChange={(e) => setEmail(e.target.value)}
style={{ width: "100%", padding: "10px", marginTop: "15px" }}
/>

<input
type="password"
placeholder="Password"
value={password}
autoComplete="current-password"
onChange={(e) => setPassword(e.target.value)}
style={{ width: "100%", padding: "10px", marginTop: "10px" }}
/>

<button
style={{
width: "100%",
marginTop: "20px",
padding: "10px",
background: "#667eea",
color: "white",
border: "none",
cursor: "pointer",
}}
>
Login
</button>

</motion.form>

</div>
);
}

export default Login;