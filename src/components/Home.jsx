import axios from "axios";
import { useEffect, useState } from "react";
// import { DropdownButton } from "react-bootstrap";
import { Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
// import { Dropdown } from "bootstrap";

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://opentdb.com/api_category.php").then((res) => {
            setLoading(true);
            setCategories(res.data.trivia_categories);

            setLoading(false);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/questions", { state: { category: category } });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <form className="home" onSubmit={handleSubmit}>
            <h5>Choose your category</h5>
            <select
                defaultValue={"DEFAULT"}
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="DEFAULT" disabled>
                    Choose a Category ...
                </option>
                {categories.map((category) => (
                    <option value={category.id} key={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            <Button
                // as={Link}
                // to="/questions"
                variant="outline-primary"
                type="submit"
                style={{
                    marginTop: "10px",
                }}
            >
                Start
            </Button>
        </form>
    );
};

export default Home;
