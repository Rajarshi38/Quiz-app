import axios from "axios";
import { useEffect, useState } from "react";
import Question from "./Question";
import { useParams } from "react-router-dom";
const Questions = () => {
    const { category } = useParams();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeButton, setActiveButton] = useState(5);

    const decodeString = (str) => {
        const textArea = document.createElement("textarea");
        textArea.innerHTML = str;
        return textArea.value;
    };

    const activeButtonHandler = (index) => {
        setActiveButton(index);
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

    // const currentQuestion = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
    const currentQuestion = questions[currentIndex];

    const previousHandler = () => {
        setCurrentIndex(currentIndex - 1);
    };

    const nextHandler = () => {
        setCurrentIndex(currentIndex + 1);
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
            <h3 className="question-number">Question - {currentIndex + 1}</h3>
            <Question
                currentQuestion={currentQuestion}
                loading={loading}
                activeButton={activeButton}
                activeButtonHandler={activeButtonHandler}
            />
            <div
                style={{
                    textAlign: "right",
                    marginTop: "12px",
                    paddingRight: "12px",
                }}
            >
                <button
                    className={`controller btn btn-outline-secondary ${
                        currentIndex === 0 ? "disabled" : ""
                    }`}
                    onClick={previousHandler}
                >
                    Previous
                </button>
                <button
                    className={`controller btn btn-primary ${
                        currentIndex === questions.length - 1 ? "disabled" : ""
                    }`}
                    onClick={nextHandler}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Questions;
