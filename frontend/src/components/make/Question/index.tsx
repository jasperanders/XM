import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import MakeFreeText from "./MakeFreeText";
import MakeMultipleChoice from "./MakeMultipleChoice";
import { TRootState } from "../../../types/examTypes";
import { questionTypes } from "../../../constants/constants";

export default function Question({ questionType: questionTypeProp }) {
  /**
   * React Hooks
   */
  const [questionType, setQuestionType] = useState("");
  /**
   * Redux
   */
  const currentQuestionId = useSelector(
    (state: TRootState) => state.examState.currentQuestionId
  );
  const questionTable = useSelector((state: TRootState) => state.questionTable);

  /**
   * Hook Form
   */

  const { register, handleSubmit, watch, errors, reset, getValues } = useForm();

  /**
   * Effects
   */
  useEffect(() => {
    if (!currentQuestionId) {
      setQuestionType(questionTypeProp);
    } else {
      console.log(questionTable.byId[currentQuestionId].questionType);
      setQuestionType(questionTable.byId[currentQuestionId].questionType);
    }
  }, [currentQuestionId, questionTypeProp]);
  const questionBody = () => {
    console.log("questionType");
    console.log(questionType);
    switch (questionType) {
      case questionTypes[0].name:
        return (
          <MakeFreeText
            register={register}
            handleSubmit={handleSubmit}
            getValues={getValues}
            reset={reset}
            questionId={currentQuestionId}
          />
        );
      case questionTypes[1].name:
        return (
          <MakeMultipleChoice
            register={register}
            questionId={currentQuestionId}
            handleSubmit={handleSubmit}
            getValues={getValues}
            reset={reset}
          />
        );
      default:
        return <div>Something went wrong</div>;
    }
  };
  return <div>{questionBody()}</div>;
}
