import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import FreeTextQuestion from "./questionType/FreeTextQuestion";
import { TRootState } from "../../types/exam";
import { Heading } from "theme-ui";

import Timer from "../timer/Timer";
import { setQuestionStartTime } from "../../redux/actions";

export default function Question({ question }) {
  const dispatch = useDispatch();

  const { register, handleSubmit, watch, errors, reset } = useForm();

  const { questionId, answerType, questionText, questionTitle } = question;

  useEffect(() => {
    dispatch(setQuestionStartTime({ questionId }));
    reset();
  }, [questionId]);

  const questionBody = () => {
    switch (answerType) {
      case "freeText":
        return (
          <FreeTextQuestion
            register={register}
            handleSubmit={handleSubmit}
            watch={watch}
            errors={errors}
            question={question}
          />
        );
      default:
        return <div>Something went wrong</div>;
    }
  };

  return (
    <div>
      <Heading as={"h2"}>{questionTitle}</Heading>
      <p>{questionText}</p>
      {questionBody()}
      <Timer question={question}></Timer>
    </div>
  );
}
