import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Question from "../components/question/Question";
import { TRootState } from "../types/examTypes";
import Layout from "../components/layout/Layout";
import ExamProgress from "../components/head/ExamProgress";

function Exam() {
  const questions = useSelector((state: TRootState) => state.questionTable);
  const { currentQuestionId, examFinished } = useSelector(
    (state: TRootState) => state.examState
  );

  return (
    <Layout
      mainContent={<Question question={questions.byId[currentQuestionId]} />}
      header={<ExamProgress />}
    />
  );
}

export default Exam;
