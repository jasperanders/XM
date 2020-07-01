import React, { lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Exam from "./Exam";
import Layout from "../components/layout/Layout";
import { importMDX } from "mdx.macro";
import ExamProgress from "../components/head/ExamProgress";
import { useSelector } from "react-redux";
import { TRootState } from "../types/examTypes";
const ExamEnd = lazy(() => importMDX("../mdx/examEnd.mdx"));

export default function Routes() {
  const examFinished = useSelector(
    (state: TRootState) => state.examState.examFinished
  );
  return (
    <Switch>
      <Route exact path="/">
        {examFinished ? (
          <Redirect to="/exam/done/" />
        ) : (
          <Redirect to="/exam/" />
        )}
      </Route>
      <Route exact path="/exam/">
        {examFinished ? <Redirect to="/exam/done/" /> : <Exam />}
      </Route>
      <Route exact path="/exam/done/">
        {examFinished ? (
          <Layout header={<ExamProgress />} mainContent={<ExamEnd />} />
        ) : (
          <Redirect to="/exam/" />
        )}
      </Route>
      <Route path="/">
        <Redirect to="/exam/" />
      </Route>
    </Switch>
  );
}
