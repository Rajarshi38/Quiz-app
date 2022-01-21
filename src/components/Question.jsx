const Question = ({
    currentQuestion,
    loading,
    currentIndex,
    options,
    activeButtonHandler,
}) => {
    // const [question, setQuestion] = useState(currentQuestion);
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

    // const activeButtonHandler = (index) => {
    //     currentQuestion.selectedOption = index;
    // };

    return (
        <div className="question-item" key={currentQuestion.id}>
            <div>{currentQuestion.question}</div>
            <div className="option-list">
                {currentQuestion.options.map((option, index) => (
                    <button
                        type="button"
                        className={`btn ${
                            options[currentIndex] === index
                                ? "btn-primary"
                                : "btn-outline-primary"
                        }`}
                        // key={`${option}-${options[currentIndex] === index}`}
                        key={option}
                        onClick={() => activeButtonHandler(currentIndex, index, option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Question;
