import React, { useEffect } from "react";
import Question from "./Question";
import { TRootState } from "../../types/examTypes";
import { useSelector } from "react-redux";

export default function Make() {


  return (
    <div>
      <Question />
    </div>
  );
}
