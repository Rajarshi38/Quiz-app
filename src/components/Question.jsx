const Question = ({ currentQuestion, loading }) => {

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="question-item" key={currentQuestion.id}>
            <div>{currentQuestion.question}</div>
            <div className="option-list">
                {currentQuestion.options.map((option) => (
                    <button className="btn btn-outline-primary" key={option}>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Question;
