import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Starter = () => {
    return (
        <div className="starter">
            <h3>Hello there, Welcome to the quiz app</h3>
            <Link to="/home">
                <Button variant="outline-primary">Get Started</Button>
            </Link>
        </div>
    );
};

export default Starter;
