import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Stores from "./pages/Stores";
import AdminDashboard from "./pages/AdminDashboard";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <nav
      style={{
        padding: "15px",
        background: "#1e293b",
        color: "white",
        display: "flex",
        gap: "15px",
      }}
    >
      <b>Roxiler Store Rating</b>
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        Stores
      </Link>
      {role === "admin" && (
        <Link to="/admin" style={{ color: "white" }}>
          Admin
        </Link>
      )}
      <div style={{ marginLeft: "auto" }}>
        {!token ? (
          <>
            <Link to="/login" style={{ color: "white", marginRight: "10px" }}>
              Login
            </Link>
            <Link to="/signup" style={{ color: "white" }}>
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Stores />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
export default App;
