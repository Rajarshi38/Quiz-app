import { Form, Card, Button, Alert } from "react-bootstrap";
import { useState, useRef } from "react";
import { useAuth } from "./Contexts/AuthContext";
import { Link } from "react-router-dom";
const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { signup } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Password do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError("Failed to create an account");
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
          <h2 className="text-center mb-2">Sign Up</h2>
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
            <Form.Group id="password-confirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" required ref={confirmPasswordRef} />
            </Form.Group>
            <Button type="submit" disabled={loading} className="w-100 mt-3">
              Sign Up
            </Button>
          </Form>
          <div className="text-center mt-2 w-100">
            Already have an account ?{" "}
            <Link to="/login" className="text-decoration-none">
              Log in
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Signup;
