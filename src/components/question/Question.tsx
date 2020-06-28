import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import FreeTextQuestion from "./questionType/FreeTextQuestion";
import MultipleChoiceQuestion from "./questionType/MultipleChoice";
import { TQuestion } from "../../types/exam";
import { Heading } from "theme-ui";

import Timer from "../timer/Timer";
import { setQuestionStartTime } from "../../redux/actions";

export default function Question({ question }: TProps) {
  const dispatch = useDispatch();

  const { register, handleSubmit, watch, errors, reset } = useForm();

  const { questionId, questionType, title, text } = question;

  useEffect(() => {
    dispatch(setQuestionStartTime({ questionId }));
    reset();
  }, [questionId]);

  const questionBody = () => {
    switch (questionType) {
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
      case "multipleChoice":
        return (
          <MultipleChoiceQuestion
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
      <Heading as={"h2"}>{title}</Heading>
      <p>{text}</p>
      {questionBody()}
      <Timer question={question}></Timer>
    </div>
  );
}

interface TProps {
  question: TQuestion;
}
