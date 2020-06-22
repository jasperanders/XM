import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TRootState } from "../../types/exam";
import { setAppTimer, countDownAppTimer } from "../../redux/actions";
import { store } from "../../index";

export default function Timer({ questionId }) {
  const dispatch = useDispatch();
  const timeLimit = useSelector(
    (state: TRootState) => state.questions.byId[questionId].timeLimit
  );
  const { timerIsActive, currentTime } = useSelector(
    (state: TRootState) => state.appState
  );

  const dispatchSetAppTimer = (payload) => dispatch(setAppTimer(payload));
  const dispatchCountDownAppTimer = (payload) =>
    dispatch(countDownAppTimer(payload));

  useEffect(() => {
    let interval = null;
    if (timerIsActive) {
      if (currentTime === null) {
        dispatchSetAppTimer({ timeLimit });
      }
      interval = setInterval(() => {
        dispatchCountDownAppTimer({ countDownBy: 1 });
        if (store.getState().appState.currentTime <= 0) {
          clearInterval(interval);
          console.log("Next Question");
        }
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [questionId]);

  return <div>Time remaining: {currentTime}</div>;
}
