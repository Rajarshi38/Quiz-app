import { useState } from "react";
// import { DropdownButton } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// import { Dropdown } from "bootstrap";

const Home = () => {
    const [category, setCategory] = useState("");

    return (
        <div className="home">
            <h5>Choose your category</h5>
            <select class="form-select" aria-label="Default select example">
                <option selected>Category..</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Economics">Economics</option>
                <option value="Environment">Environment</option>
            </select>

            <Button
                as={Link}
                to="/questions"
                variant="outline-primary"
                style={{
                    marginTop: "10px",
                }}
            >
                Start
            </Button>
        </div>
    );
};

export default Home;
