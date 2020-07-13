import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import MakeFreeText from "./MakeFreeText";
import MakeMultipleChoice from "./MakeMultipleChoice";
import { TRootState } from "../../../types/examTypes";

export default function Question() {
  /**
   * React Hooks
   */
  const [currentAnswerAction, setCurrentAnswerAction] = useState(() => {});
  const [currentQuestionState, setCurrentQuestionState] = useState({
    questionType: "freeText",
    question: null,
  });
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
    if (currentQuestionId) {
      setCurrentQuestionState({
        questionType: questionTable.byId[currentQuestionId].questionType,
        question: questionTable.byId[currentQuestionId],
      });
    }
  }, [currentQuestionId]);

  const questionBody = () => {
    switch (currentQuestionState.questionType) {
      case "freeText":
        return (
          <MakeFreeText
            register={register}
            handleSubmit={handleSubmit}
            getValues={getValues}
            setCurrentAnswerAction={setCurrentAnswerAction}
            reset={reset}
            questionId={currentQuestionId}
          />
        );
      case "multipleChoice":
        return (
          <MakeMultipleChoice
            register={register}
            handleSubmit={handleSubmit}
            getValues={getValues}
            setCurrentAnswerAction={setCurrentAnswerAction}
            reset={reset}
          />
        );
      default:
        return <div>Something went wrong</div>;
    }
  };
  return <div>{questionBody()}</div>;
}
