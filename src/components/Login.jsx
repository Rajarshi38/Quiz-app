import { useState, useRef } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "./Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/home");
    } catch (error) {
      setError("Failed to log in");
    }

    setLoading(false);
  };
  return (
    <>
      <Card
        className="w-100"
        style={{
          maxWidth: "400px",
        }}
      >
        <Card.Body>
          <h2 className="text-center mb-2">
            <FaUser
              style={{
                marginBottom: "10px",
                marginRight: "10px",
              }}
            />
            Log In
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required ref={passwordRef} />
            </Form.Group>
            <Button type="submit" disabled={loading} className="w-100 mt-3">
              Login
            </Button>
          </Form>
          <div className="text-center mt-2 w-100">
            Doesn't have an account?{" "}
            <Link to="/signup" className="text-decoration-none">
              Sign Up
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Login;
