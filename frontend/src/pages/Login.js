import { useState } from "react";
import axios from "axios";

function Login({ setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      // Save token and role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert("Login Successful ✅");

      // Refresh dashboard
      setLoggedIn(true);

      // Reload page
      window.location.reload();

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed ❌"
      );
    }
  };

  return (
    <div className="auth-card">

      <div className="logo-circle">F</div>

      <h1 className="main-title">
        Academic Feedback System
      </h1>

      <h2 className="welcome-text">
        Welcome back
      </h2>

      <input
        className="input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="primary-btn"
        onClick={loginUser}
      >
        Login
      </button>

    </div>
  );
}

export default Login;