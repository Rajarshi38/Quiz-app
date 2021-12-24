import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Navbar, Nav } from "react-bootstrap";

const Header = () => {
    return (
        <div className="header">
            {/* <nav className="navbar navbar-light bg-primary">
                <h5 style={{
                    color : "yellow"
                }}>Hello Quiz</h5>
                <ul>
                    <Link to="/"><li>Home</li></Link>
                    <li>About</li>
                    <li>Contact</li>
                    
                </ul>
            
                
            </nav> */}

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
                    <Button variant="outline-light" className="">
                        Login
                    </Button>
                </Nav>
            </Navbar>
        </div>
    );
};

export default Header;
