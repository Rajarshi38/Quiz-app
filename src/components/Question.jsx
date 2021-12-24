import { useState } from "react";

const Question = ({ currentQuestion, loading, activeButton, activeButtonHandler }) => {
    if (loading) {
        return <div>Loading...</div>;
    }

    // document.querySelectorAll(".btn").forEach((button) => {
    //     button.addEventListener("click", () => {
    //         document.querySelectorAll(".btn-primary").forEach((button) => {
    //             button.classList.remove("btn-primary");
    //             button.classList.add("btn-outline-primary");
    //         });

    //         button.classList.remove("btn-outline-primary");
    //         button.classList.add("btn-primary");
    //     });
    // });

    return (
        <div className="question-item" key={currentQuestion.id}>
            <div>{currentQuestion.question}</div>
            <div className="option-list">
                {currentQuestion.options.map((option, index) => (
                    <button
                        className={`btn ${
                            activeButton === index ? "btn-primary" : "btn-outline-primary"
                        }`}
                        key={option}
                        onClick={() => activeButtonHandler(index)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Question;
