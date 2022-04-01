import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import { useAuth } from "./Contexts/AuthContext";

import { useState } from "react";

const Header = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

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
      <Navbar bg="primary" variant="primary">
        <Navbar.Brand
          style={{
            marginLeft: "20px",
            color: "yellow",
          }}
        >
          Hello-Quiz
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/home">
            Categories
          </Nav.Link>
        </Nav>
        <Nav className="me-4">
          {currentUser ? (
            <Button variant="outline-light" onClick={logoutHandler}>
              Logout
            </Button>
          ) : (
            <Button variant="outline-light" className="" as={Link} to="/login">
              Login
            </Button>
          )}
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
