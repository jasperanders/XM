import React, { useState } from "react";
import Question from "./Question";
import Tabs from "../basics/Tab";
import { questionTypes } from "../../constants/constants";
import Exam from "./Exam";
import { Button } from "theme-ui";

export default function Make() {
  const [mode, setMode] = useState("exam");
  const makeQuestionCmpArr = () => {
    const res = [];
    questionTypes.map((qstn) => {
      res.push(<Question questionType={qstn.name} />);
    });
    return res;
  };

  return (
    <div>
      {mode === "question" ? (
        <Tabs tabNames={questionTypes} tabComponents={makeQuestionCmpArr()} />
      ) : (
        <Exam />
      )}
      <Button
        onClick={() => {
          if (mode === "question") {
            setMode("exam");
          } else {
            setMode("question");
          }
        }}
      >
        Change Mode
      </Button>
    </div>
  );
}
  