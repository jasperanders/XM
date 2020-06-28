import React from "react";
import { multipleChoiceFormName } from "../../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { Label, Checkbox, Button } from "theme-ui";
import { TRootState } from "../../../types/exam";
import { v4 } from "uuid";

export default function MultipleChoiceQuestion({
  register,
  handleSubmit,
  watch,
  errors,
  question,
}) {
  const dispatch = useDispatch();
  const questionBody = useSelector(
    (state: TRootState) =>
      state.questionBodyMultipleChoiceTable.byId[question.questionId]
  );

  const { possibleAnswers } = questionBody;

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
    <form
      onSubmit={handleSubmit((data) => {
        console.log("Data is");
        console.log(data);
      })}
    >
      {possibleAnswers.map((possibleAnswer, index) => {
        return (
          <div>
            <Label>
              {/* <Controller as={Checkbox} name={multipleChoiceFormName} /> */}
              <Checkbox
                key={v4()}
                defaultChecked={false}
                name={multipleChoiceFormName + index}
                ref={register}
              />
              {possibleAnswer}
            </Label>
          </div>
        );
      })}
      <Button type="submit">Save and Next Question</Button>
    </form>
  );
}
