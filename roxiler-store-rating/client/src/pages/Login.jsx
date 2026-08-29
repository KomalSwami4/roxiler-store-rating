import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      alert("Login Success");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        boxShadow: "0 0 10px #ccc",
        borderRadius: "10px",
      }}
    >
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          style={{
            width: "100%",
            padding: "10px",
            background: "#1e293b",
            color: "white",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
