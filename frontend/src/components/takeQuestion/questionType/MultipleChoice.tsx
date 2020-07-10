import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Label, Checkbox, Button } from "theme-ui";
import { TRootState } from "../../../types/examTypes";
import { v4 } from "uuid";
import {
  nextQuestion,
  answerMultipleChoiceQuestion,
  setAnswerEndTime,
} from "../../../redux/actions";
import { multipleChoiceFormName } from "../../../constants/constants";

export default function MultipleChoiceQuestion({
  register,
  handleSubmit,
  question,
  getValues,
  setCurrentAnswerAction,
}) {
  /**
   * Redux hooks
   */
  const dispatch = useDispatch();

  const questionBody = useSelector(
    (state: TRootState) =>
      state.questionBodyMultipleChoiceTable.byId[question.questionId]
  );

  const currentExam = useSelector((state: TRootState) => state.examTable);

  const { currentExamId } = useSelector((state: TRootState) => state.examState);

  /**
   * miscellaneous functions
   */

  const makeSelectedAnswers = (data) => {
    const { multipleChoice } = data;
    let selectedAnswers = [];
    possibleAnswers.forEach((el, i) => {
      console.log(multipleChoice[i]);
      console.log(el);
      if (data.multipleChoice[i]) {
        selectedAnswers.push(el);
      }
    });
    console.log(selectedAnswers);
    return selectedAnswers;
  };

  /**
   * Effect Hooks
   */

  useEffect(() => {
    setCurrentAnswerAction(() => {
      return () => {
        // {nested: true} returns values as if they were submitted
        const selectedAnswers = makeSelectedAnswers(getValues({ nest: true }));
        console.log(selectedAnswers);
        console.log("selectedAnswers");
        return answerMultipleChoiceQuestion({
          questionId,
          selectedAnswers,
        });
      };
    });
  }, [question]);

  /**
   * Destructuring
   */

  const { possibleAnswers, questionId } = questionBody;

  const onSubmit = (data) => {
    const selectedAnswers = makeSelectedAnswers(data);
    dispatch(
      answerMultipleChoiceQuestion({
        questionId: questionId,
        selectedAnswers,
      })
    );
    dispatch(setAnswerEndTime({ questionId: questionId }));
    dispatch(nextQuestion({ currentExam: currentExam.byId[currentExamId] }));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {possibleAnswers.map((possibleAnswer, index) => {
        return (
          <div key={v4()}>
            <Label>
              {/* <Controller as={Checkbox} name={multipleChoiceFormName} /> */}
              <Checkbox
                defaultChecked={false}
                name={`${multipleChoiceFormName}[${index}]`}
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
