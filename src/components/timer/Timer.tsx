import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { store } from "../../App";
import { Heading } from "theme-ui";
import { TRootState } from "../../types/examTypes";
import { nextQuestion } from "../../redux/actions";

let interval;

export default function Timer({
  questionId,
  currentExam,
  answerQuestionAction,
  modalState,
  setModalState,
}) {
  const useTimer = true;
  const dispatch = useDispatch();
  const answer = useSelector(
    (state: TRootState) => state.answerTable.byId[questionId]
  );
  const question = useSelector(
    (state: TRootState) => state.questionTable.byId[questionId]
  );
  const [timerState, setTimerState] = useState({
    timesUp: false,
  });

  const { timeStart } = answer;
  const { timeLimitMs } = question;

  const [timeLeft, setTimeLeft] = useState(
    (timeStart
      ? Math.round(timeLimitMs - (Date.now() - timeStart))
      : timeLimitMs) / 1000
  );

  useEffect(() => {
    if (timerState.timesUp && modalState.continueModal) {
      dispatchTimesUpAction();
      setModalState({ ...modalState, showModal: false });
    }
  }, [modalState.continueModal, timerState]);

  useEffect(() => {
    if (modalState.showModal) {
      clearInterval(interval);
    }
  }, [modalState.showModal]);

  useEffect(() => {
    if (useTimer) {
      setTimeLeft(timeLimitMs / 1000);
      interval = setInterval(() => {
        const now = Date.now();
        const timeStart = store.getState().answerTable.byId[questionId]
          .timeStart;
        const newTimeLeft = Math.round(
          (timeLimitMs - (now - timeStart)) / 1000
        );
        if (newTimeLeft >= 0) {
          setTimeLeft(newTimeLeft);
        } else {
          setTimerState({ ...timerState, timesUp: true });
          setModalState({ ...modalState, showModal: true });
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

  const dispatchTimesUpAction = () => {
    dispatch(answerQuestionAction());
    dispatch(nextQuestion({ currentExam }));
  };

  return (
    <>
      <Heading as={"h3"}>{timeLeft}</Heading>
    </>
  );
}
