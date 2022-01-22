import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Result = () => {
    const { state } = useLocation();
    const { totalScore, category } = state;

    return (
        <div>
            <h3>Your Score is {totalScore}</h3>
            <div>
                Want to try another time? <Link to="/home">Change category</Link> or{" "}
                <Link to="/questions" state={{ category: category }}>
                    Same type
                </Link>{" "}
            </div>
        </div>
    );
};

export default Result;
