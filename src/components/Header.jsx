import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const toggleButtonRef = useRef();
  const navigate = useNavigate();

  const logoutButtonStyle = {
    visibility: "hidden",
  };

  async function logoutHandler() {
    setError("");
    try {
      await logout();
      navigate("/");
    } catch (err) {
      setError("Failed to Log Out");
      alert(error);
    }
  }

  return (
    <div className="header">
      <div className="brand">
        <Link to="/">
          <img src="brand.png" alt="" />
        </Link>
      </div>
      <div
        className="toggle-button"
        onClick={() => {
          toggleButtonRef.current.classList.toggle("active");
        }}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <div className="nav-links" ref={toggleButtonRef}>
        <ul>
          <li>
            <Link to="/home">Categories</Link>
          </li>
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
          <li
            style={
              location.pathname === "/questions" ? logoutButtonStyle : null
            }
          >
            {currentUser ? (
              <button onClick={logoutHandler}>Logout</button>
            ) : (
              <Link
                to="login"
                style={{
                  padding: "0",
                }}
              >
                <button>Login</button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
