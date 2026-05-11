import { useState } from "react";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Feedback from "./pages/Feedback";
import MyFeedback from "./pages/MyFeedback";
import AdminFeedback from "./pages/AdminFeedback";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="app">
      {!token ? (
        <div>
          {!showRegister ? (
            <>
              <Login setLoggedIn={() => window.location.reload()} />

              <p className="switch-text" style={{ textAlign: "center" }}>
                New here?{" "}
                <button
                  className="link-btn"
                  onClick={() => setShowRegister(true)}
                >
                  Create an account
                </button>
              </p>
            </>
          ) : (
            <>
              <Register />

              <p className="switch-text" style={{ textAlign: "center" }}>
                Already have an account?{" "}
                <button
                  className="link-btn"
                  onClick={() => setShowRegister(false)}
                >
                  Login
                </button>
              </p>
            </>
          )}
        </div>
      ) : (
        <>
          <nav className="navbar">
            <div>
              <div className="logo small">F</div>
              <h2>Academic Feedback System</h2>
            </div>

            <button onClick={logout}>Logout</button>
          </nav>

          {role === "admin" ? (
            <AdminFeedback />
          ) : (
            <>
              <h2 style={{ textAlign: "center", marginTop: "25px" }}>
                User Dashboard
              </h2>
              <Feedback />
              <MyFeedback />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;