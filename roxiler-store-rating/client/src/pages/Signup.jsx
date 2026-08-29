import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();
  const handle = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);
      alert("Signup Success! Login now");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup Failed");
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
      <h2>Signup</h2>
      <form onSubmit={handle}>
        <input
          style={{ width: "100%", padding: "10px", margin: "5px 0" }}
          placeholder="Name (min 20 chars)"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          style={{ width: "100%", padding: "10px", margin: "5px 0" }}
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          style={{ width: "100%", padding: "10px", margin: "5px 0" }}
          placeholder="Address"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <input
          style={{ width: "100%", padding: "10px", margin: "5px 0" }}
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          style={{
            width: "100%",
            padding: "10px",
            background: "#1e293b",
            color: "white",
          }}
        >
          Signup
        </button>
      </form>
    </div>
  );
}
