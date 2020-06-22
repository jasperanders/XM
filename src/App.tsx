import React from "react";
import { useSelector } from "react-redux";
import Question from "./components/question/Question";
import { TRootState } from "./types/exam";

function App() {
  const questions = useSelector((state: TRootState) => state.questions);
  const { currentExam, byId } = useSelector((state: TRootState) => state.exams);

  const currentQuestion =
    byId[currentExam.id].questionsById[currentExam.currentQuestionIndex];

  return (
    <div className="App">
      <Question question={questions.byId[currentQuestion]} />
    </div>
  );
}

export default App;
