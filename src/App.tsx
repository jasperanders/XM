import React from "react";
import { useSelector } from "react-redux";
import Question from "./components/question/Question";
import { TRootState } from "./types/examTypes";
import Layout from "./components/layout/Layout";
import ExamProgress from "./components/head/ExamProgress";

function App() {
  const questions = useSelector((state: TRootState) => state.questionTable);
  const { currentQuestionId } = useSelector(
    (state: TRootState) => state.examState
  );

  return (
    <div className="App">
      <Layout
        mainContent={<Question question={questions.byId[currentQuestionId]} />}
        header={<ExamProgress />}
      />
    </div>
  );
}

export default App;
