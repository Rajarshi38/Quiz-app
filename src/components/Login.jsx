import { useState, useRef } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "./Contexts/AuthContext";
import { Link } from "react-router-dom";
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError("Failed to sign in");
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
          <h2 className="text-center mb-2">Log In</h2>
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
