import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Question from "../components/takeQuestion/Question";
import { TRootState } from "../types/examTypes";
import Layout from "../components/layout/Layout";
import ExamProgress from "../components/head/ExamProgress";
import { ExamContext } from "../services/examContext";
import { Spinner } from "theme-ui";

function Exam() {
  const { loading } = useContext(ExamContext);
  const questions = useSelector((state: TRootState) => state.questionTable);
  const { currentQuestionId, examFinished } = useSelector(
    (state: TRootState) => state.examState
  );

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Layout
          mainContent={
            <Question question={questions.byId[currentQuestionId]} />
          }
          header={<ExamProgress />}
        />
      )}
    </>
  );
}

export default Exam;
