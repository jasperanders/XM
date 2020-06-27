import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { freeTextFormName } from "../../../constants/constants";
import { Textarea, Button } from "theme-ui";
import {
  answerFreeTextQuestion,
} from "../../../redux/actions";

export default function FreeTexTFreeTextQuestion({
  register,
  handleSubmit,
  watch,
  errors,
  question,
}) {
  const dispatch = useDispatch();

  const { questionId, answerType, questionText, questionTitle } = question;

  const onSubmit = (data) => {
    const answer = data.freeTextFormName;
    const payload = { questionId, answer };
    dispatch(answerFreeTextQuestion(payload));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        rows={10}
        columns={20}
        onPaste={(e) => {
          e.preventDefault();
          return false;
        }}
        onCopy={(e) => {
          e.preventDefault();
          return false;
        }}
        name={freeTextFormName}
        defaultValue={question.storedAnswer}
        ref={register}
      />
      <Button type="submit">Save and Next Question</Button>
    </form>
  );
}
