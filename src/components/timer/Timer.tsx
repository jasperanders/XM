import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { store } from "../../index";
import { Heading } from "theme-ui";
import { TRootState } from "../../types/examTypes";
import { nextQuestion } from "../../redux/actions";

export default function Timer({
  questionId,
  currentExam,
  answerQuestionAction,
}) {
  const history = useHistory();
  const useTimer = true;
  const dispatch = useDispatch();
  const answer = useSelector(
    (state: TRootState) => state.answerTable.byId[questionId]
  );
  const question = useSelector(
    (state: TRootState) => state.questionTable.byId[questionId]
  );

  const { timeStart } = answer;
  const { timeLimitMs } = question;

  const [timeLeft, setTimeLeft] = useState(
    (timeStart
      ? Math.round(timeLimitMs - (Date.now() - timeStart))
      : timeLimitMs) / 1000
  );

  useEffect(() => {
    if (useTimer) {
      setTimeLeft(timeLimitMs / 1000);
      const interval = setInterval(() => {
        const now = Date.now();
        const timeStart = store.getState().answerTable.byId[questionId]
          .timeStart;
        const newTimeLeft = Math.round(
          (timeLimitMs - (now - timeStart)) / 1000
        );
        if (newTimeLeft > -1) {
          setTimeLeft(newTimeLeft);
        } else {
          console.log(questionId);
          dispatch(answerQuestionAction());
          // dispatch(nextQuestion({ currentExam }));
          clearInterval(interval);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [
    question.questionId,
    currentExam,
    dispatch,
    timeLimitMs,
    questionId,
    answerQuestionAction,
  ]);

  return (
    <>
      <Heading as={"h3"}>{timeLeft}</Heading>
    </>
  );
}
