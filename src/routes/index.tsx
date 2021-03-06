import React, { lazy, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import TakeExam from "./takeExam";
import MakeExam from "./makeExam";
import SelectExam from "./selectExam";
import Layout from "../components/layout/Layout";
import { importMDX } from "mdx.macro";
import ExamProgress from "../components/head/ExamProgress";
import { useSelector } from "react-redux";
import { TRootState } from "../types/examTypes";
import { Button } from "theme-ui";
import Login from "./login";
import { UserContext } from "../services/userContext";
const ExamEnd = lazy(() => importMDX("../mdx/examEnd.mdx"));

export default function Routes() {
  const { user } = useContext(UserContext);
  const examFinished = useSelector(
    (state: TRootState) => state.examState.examFinished
  );
  console.log(examFinished);

  return (
    <Switch>
      {user.role === "user" && (
        <>
          <Route exact path="/">
            {examFinished ? (
              <Redirect to="/exam/done/" />
            ) : (
              <Redirect to="/exam/select/" />
            )}
          </Route>
          <Route exact path="/exam/select/">
            {examFinished ? <Redirect to="/exam/done/" /> : <SelectExam />}
          </Route>
          <Route exact path="/exam/">
            {examFinished ? <Redirect to="/exam/done/" /> : <TakeExam />}
          </Route>
          <Route exact path="/exam/done/">
            {examFinished ? (
              <Layout
                header={<ExamProgress />}
                mainContent={
                  <>
                    <ExamEnd />
                    <Button >Back to the overview.</Button>
                  </>
                }
              />
            ) : (
              <Redirect to="/exam/" />
            )}
          </Route>
          <Route path="/">
            <Redirect to="/exam/select/" />
          </Route>
        </>
      )}
      {user.role === "admin" && (
        <>
          <Route path="/make/">
            <MakeExam />
          </Route>
          <Route path="/">
            <Redirect to="/make/" />
          </Route>
        </>
      )}
      <>
        <Route path="/login/">
          <Login />
        </Route>
        <Route path="/">
          <Redirect to="/login/" />
        </Route>
      </>
    </Switch>
  );
}
