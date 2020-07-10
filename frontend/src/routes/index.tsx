import React, { lazy, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import TakeExam from "./takeExam";
import MakeExam from "./makeExam";
import Layout from "../components/layout/Layout";
import { importMDX } from "mdx.macro";
import ExamProgress from "../components/head/ExamProgress";
import { useSelector } from "react-redux";
import { TRootState } from "../types/examTypes";
const ExamEnd = lazy(() => importMDX("../mdx/examEnd.mdx"));

export default function Routes() {
  const [user, setUser] = useState("admin");
  const examFinished = useSelector(
    (state: TRootState) => state.examState.examFinished
  );

  const makeRoutes = () => {
    if (user === "user") {
      return (
        <>
          <Route exact path="/">
            {examFinished ? (
              <Redirect to="/exam/done/" />
            ) : (
              <Redirect to="/exam/" />
            )}
          </Route>
          <Route exact path="/exam/">
            {examFinished ? <Redirect to="/exam/done/" /> : <TakeExam />}
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
        </>
      );
    } else if (user === "admin") {
      return (
        <Route path="/">
          <MakeExam />
        </Route>
      );
    } else {
      return <Redirect to="/login/" />;
    }
  };

  return <Switch>{makeRoutes()}</Switch>;
}
