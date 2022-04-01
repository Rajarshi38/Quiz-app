const Question = ({
  currentQuestion,
  loading,
  currentIndex,
  options,
  activeButtonHandler,
}) => {
  if (loading) {
    return <div>Loading...</div>;
  }

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
