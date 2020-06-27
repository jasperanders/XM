import React from "react";
import { useDispatch } from "react-redux";
import { Label, Checkbox, Button } from "theme-ui";

export default function FreeTexTFreeTextQuestion({
  register,
  handleSubmit,
  watch,
  errors,
  question,
}) {
  const dispatch = useDispatch();

  const { possibleAnswers } = question;

  // const onSubmit = (data) => {
  //   let action = undefined;
  //   switch (answerType) {
  //     case "freeText":
  //       const answer = data[freeTextFromName];
  //       const payload = { questionId, answer };
  //       action = answerFreeTextQuestion(payload);
  //       break;

  //     default:
  //       break;
  //   }

  //   dispatch(action);
  //   dispatch(seTFreeTextQuestionEndTime({ questionId }));
  //   dispatch(nexTFreeTextQuestion());
  // };

  return (
    <form onSubmit={handleSubmit(() => {})}>
      {possibleAnswers.forEach((possibleAnswer) => (
        <Label>
          <Checkbox defaultChecked={true} />
          {possibleAnswer}
        </Label>
      ))}
      <Button type="submit">Save and Next Question</Button>
    </form>
  );
}
