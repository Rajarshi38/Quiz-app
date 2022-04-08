import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";

const Result = () => {
  const { state } = useLocation();
  const { totalScore, category } = state;
  const { currentUser } = useAuth();

  return (
    <div className="result">
      <h3>
        {currentUser.displayName}, Your Score is {totalScore}
      </h3>
      <div>
        Want to try another time?{" "}
        <Link to="/home" className="text-decoration-none">
          Change category
        </Link>{" "}
        or{" "}
        <Link
          to="/questions"
          state={{ category: category }}
          className="text-decoration-none"
        >
          Same type
        </Link>{" "}
      </div>
    </div>
  );
};

export default Result;
