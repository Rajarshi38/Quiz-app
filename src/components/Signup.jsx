import { Form, Card, Button, Alert } from "react-bootstrap";
import { useState, useRef } from "react";
import { useAuth } from "./Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
const Signup = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { signup } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usernameRef.current.value.length < 4)
      return setError("username should be minimum 4 letters");
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Password do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(
        usernameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/home");
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
          <h2 className="text-center mb-2">
            <FaUser
              style={{
                marginBottom: "10px",
                marginRight: "10px",
              }}
            />
            Sign Up
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" required ref={usernameRef} pattern />
            </Form.Group>
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
