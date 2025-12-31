import { useState } from "react";

const questions = [
  {
    question: "What is React?",
    options: ["A library", "A framework", "A language", "A database"],
    correct: 0,
  },
  {
    question: "Who developed React?",
    options: ["Google", "Facebook", "Microsoft", "Amazon"],
    correct: 1,
  },
  {
    question: "What hook is used for state?",
    options: ["useRef", "useEffect", "useState", "useMemo"],
    correct: 2,
  },
  {
    question: "JSX stands for?",
    options: [
      "Java Syntax Extension",
      "JavaScript XML",
      "JSON XML",
      "JavaScript Extra",
    ],
    correct: 1,
  },
  {
    question: "React runs in the?",
    options: ["Server", "Database", "Browser", "Compiler"],
    correct: 2,
  },
];

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  function handleAnswer(selectedIndex) {
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  }
//   !showResult

  return (
    <div style={{ maxWidth: "500px", margin: "auto", textAlign: "center" }}>
      { !showResult ? (
        <>
          <h2>
            Question {currentQuestion + 1} of {questions.length}
          </h2>

          <h3>{questions[currentQuestion].question}</h3>

          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              style={{
                display: "block",
                width: "100%",
                margin: "10px 0",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              {option}
            </button>
          ))}
        </>
      ) : (
        <>
          <h2>Quiz Completed </h2>
          <p>
            Your Score: {score} / {questions.length}
          </p>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </>
      )}

      
    </div>
  );
}

export default Quiz;
