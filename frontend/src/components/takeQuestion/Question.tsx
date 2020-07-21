import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import FreeTextQuestion from "./questionType/FreeTextQuestion";
import MultipleChoiceQuestion from "./questionType/MultipleChoice";
import { TQuestion, TRootState } from "../../types/examTypes";
import { Heading } from "theme-ui";

import Timer from "../timer/Timer"; //!Important
import { setAnswerStartTime } from "../../redux/actions";

export default function Question({ question }: TProps) {
  const [currentAnswerAction, setCurrentAnswerAction] = useState(() => {});
  const { questionId, questionType, title, text } = question;
  const dispatch = useDispatch();
  const { currentExamId } = useSelector((state: TRootState) => state.examState);
  const currentExam = useSelector(
    (state: TRootState) => state.examTable.byId[currentExamId]
  );
  const { register, handleSubmit, reset, getValues } = useForm();

  useEffect(() => {
    dispatch(setAnswerStartTime({ questionId }));
    reset();
  }, [questionId, dispatch, reset]);

  const questionBody = () => {
    switch (questionType) {
      case "freeText":
        return (
          <FreeTextQuestion
            register={register}
            handleSubmit={handleSubmit}
            question={question}
            getValues={getValues}
            setCurrentAnswerAction={setCurrentAnswerAction}
          />
        );
      case "multipleChoice":
        return (
          <MultipleChoiceQuestion
            register={register}
            handleSubmit={handleSubmit}
            question={question}
            getValues={getValues}
            setCurrentAnswerAction={setCurrentAnswerAction}
          />
        );
      default:
        return <div>Something went wrong</div>;
    }
  };
  return (
    <div>
      <Heading as={"h2"}>{title}</Heading>
      <p>{text}</p>
      {questionBody()}
      <Timer
        questionId={questionId}
        currentExam={currentExam}
        answerQuestionAction={currentAnswerAction}
      ></Timer>
    </div>
  );
}

interface TProps {
  question: TQuestion;
}
