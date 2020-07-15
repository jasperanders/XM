import React, { useEffect, useState } from "react";
import Question from "./Question";
import Tabs from "../basics/Tab";
import { questionTypes } from "../../constants/constants";

export default function Make() {
  const makeQuestionCmpArr = () => {
    const res = [];
    questionTypes.map((qstn) => {
      res.push(<Question questionType={qstn.name} />);
    });
    return res;
  };

  return (
    <div>
      <Tabs tabNames={questionTypes} tabComponents={makeQuestionCmpArr()} />
    </div>
  );
}
