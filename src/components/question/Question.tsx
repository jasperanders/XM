import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import FreeTextQuestion from "./questionType/FreeTextQuestion";
import { TQuestion } from "../../types/exam";
import { answerQuestion } from "../../redux/actions";

export default function Question({ question }: TProps) {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, errors } = useForm();

  const { questionId } = question;

  const onSubmit = (data) => {
    const { answerText } = data;
    console.log(data);
    dispatch(answerQuestion({ questionId, answerText: answerText }));
  };

  const { answerType, questionText, questionTitle } = question;

  const questionBody = () => {
    switch (answerType) {
      case "freeText":
        return (
          <FreeTextQuestion
            register={register}
            handleSubmit={handleSubmit}
            watch={watch}
            errors={errors}
            onSubmit={onSubmit}
          />
        );
      default:
        return <div>Something went wrong</div>;
    }
  };

  return (
    <div>
      <div>{questionTitle}</div>
      <div>{questionText}</div>
      {questionBody()}
    </div>
  );
}

interface TProps {
  question: TQuestion;
}
