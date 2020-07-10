import React from "react";
import { useSelector } from "react-redux";
import Question from "./components/takeQuestion/Question";
import { TRootState } from "./types/examTypes";
import Layout from "./components/layout/Layout";
import ExamProgress from "./components/head/ExamProgress";
import Routes from "./routes";

function App() {
  const questions = useSelector((state: TRootState) => state.questionTable);
  const { currentQuestionId } = useSelector(
    (state: TRootState) => state.examState
  );

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
