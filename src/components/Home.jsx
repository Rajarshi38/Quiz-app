import { useState } from "react";

import { Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import useCategories from "./api/useCategories";
import { useAuth } from "./Contexts/AuthContext";

const Home = () => {
  const { currentUser } = useAuth();
  const [category, setCategory] = useState(null);
  const [loading, categories] = useCategories();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCategory(JSON.parse(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/questions", { state: { category: category } });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form className="home" onSubmit={handleSubmit}>
      <h5 className="text-center">
        Hi, {currentUser.displayName} <br />
        Please Choose your category
        <br />
        <span className="warn text-danger">
          Not selecting category will lead to random categories
        </span>
      </h5>
      <select
        defaultValue={"DEFAULT"}
        className="form-select"
        aria-label="Default select example"
        onChange={handleChange}
      >
        <option value="DEFAULT" disabled>
          Choose a Category ...
        </option>
        {categories.map((category) => (
          <option value={JSON.stringify(category)} key={category.id}>
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
