import React from "react";
import { useForm } from "react-hook-form";
import FreeTextQuestion from "./questionType/FreeTextQuestion";

export default function Question({ question }) {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  const { body, title, questionText } = question;

  const questionBody = () => {
    switch (body.answerType) {
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
      <div>{title}</div>
      <div>{questionText}</div>
      {questionBody()}
    </div>
  );
}
