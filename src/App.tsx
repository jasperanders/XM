import React from "react";
import { useSelector } from "react-redux";
import Question from "./components/question/Question";
import { TRootState } from "./types/exam";
import Layout from "./components/layout/Layout";
import ExamProgress from "./components/basics/progress/ExamProgress";

function App() {
  const questions = useSelector((state: TRootState) => state.questions);
  const { currentExam, byId } = useSelector((state: TRootState) => state.exams);

  const currentQuestion =
    byId[currentExam.id].questionsById[currentExam.currentQuestionIndex];

  return (
    <div className="App">
      <Layout
        mainContent={<Question question={questions.byId[currentQuestion]} />}
        header={<ExamProgress />}
      />
    </div>
  );
}

export default App;
