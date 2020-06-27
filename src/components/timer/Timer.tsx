import React, { useEffect, useState } from "react";
import { store } from "../../index";
import { Heading } from "theme-ui";

export default function Timer({ question }) {
  const { timeStart, timeLimit, questionId } = question;
  const now = Date.now();

  const [timeLeft, setTimeLeft] = useState(
    timeStart ? Math.trunc(timeLimit - (now - timeStart) / 1000) : timeLimit
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeStart = store.getState().answerTable.byId[questionId].timeStart;
      setTimeLeft(Math.trunc(timeLimit - (now - timeStart) / 1000));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [question.questionId]);

  return <Heading as={"h3"}>{timeLeft}</Heading>;
}
