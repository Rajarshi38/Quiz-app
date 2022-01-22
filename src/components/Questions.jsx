import axios from "axios";
import { useEffect, useState } from "react";
import Question from "./Question";
import { useNavigate, useLocation } from "react-router-dom";
const Questions = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const { category } = state;

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    // const [activeButton, setActiveButton] = useState(5);
    const [options, setOptions] = useState(new Array(10).fill(-1));
    const [score, setScore] = useState(new Array(10).fill(0));

    const decodeString = (str) => {
        const textArea = document.createElement("textarea");
        textArea.innerHTML = str;
        return textArea.value;
    };

    const activeButtonHandler = (questionNumber, optionNumber, option) => {
        // options[questionNumber] = optionNumber

        if (questions[currentIndex].answer === option) {
            setScore((prev) => {
                const newScore = [...prev];
                newScore[questionNumber] = 1;
                return newScore;
            });
        } else {
            setScore((prev) => {
                const newScore = [...prev];
                newScore[questionNumber] = 0;
                return newScore;
            });
        }
        setOptions((prev) => {
            const newArray = [...prev];
            newArray[questionNumber] = optionNumber;
            return newArray;
        });
    };

    useEffect(() => {
        axios
            .get(
                `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`
            )
            .then((res) => {
                setLoading(true);
                setQuestions(
                    res.data.results.map((questionItem, index) => {
                        const answer = decodeString(questionItem.correct_answer);
                        const options = [
                            ...questionItem.incorrect_answers.map((a) => decodeString(a)),
                            answer,
                        ];
                        return {
                            id: `${index} - ${Date.now()}`,
                            question: decodeString(questionItem.question),
                            answer: answer,
                            options: options.sort(() => Math.random() - 0.5),
                        };
                    })
                );
                setLoading(false);
            });
    }, [category]);

    // useEffect(() => {
    //     console.log(score);
    // }, [score]);

    // const currentQuestion = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
    const currentQuestion = questions[currentIndex];

    const previousHandler = () => {
        setCurrentIndex(currentIndex - 1);
    };

    const nextHandler = () => {
        setCurrentIndex(currentIndex + 1);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        let totalScore = score.reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        }, 0);
        navigate("/result", {
            state: { totalScore: totalScore, category: category },
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="questions">
            {/* {questions.map((question) => (
                <div className="question-item" key={question.id}>
                    <div>{question.question}</div>
                    <div className="option-list">
                        {question.options.map((option) => (
                            <button
                                className="btn btn-outline-primary"
                                key={option}
                                active="true"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ))} */}
            <form onSubmit={submitHandler}>
                <h3 className="question-number">Question - {currentIndex + 1}</h3>
                <Question
                    currentQuestion={currentQuestion}
                    loading={loading}
                    currentIndex={currentIndex}
                    options={options}
                    activeButtonHandler={activeButtonHandler}
                />
                <div
                    style={{
                        display: "flex",
                        marginTop: "12px",
                        justifyContent: "space-between",
                    }}
                >
                    <div
                        style={{
                            textAlign: "left",
                        }}
                    >
                        <button
                            type="button"
                            className={`controller btn btn-outline-secondary ${
                                currentIndex === 0 ? "disabled" : ""
                            }`}
                            onClick={previousHandler}
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            className={`controller btn btn-primary ${
                                currentIndex === questions.length - 1 ? "disabled" : ""
                            }`}
                            onClick={nextHandler}
                        >
                            Next
                        </button>
                    </div>
                    <div
                        style={{
                            textAlign: "right",
                        }}
                    >
                        <button type="submit" className="btn btn-success submit">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Questions;
