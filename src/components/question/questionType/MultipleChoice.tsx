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

export default function MultipleChoiceQuestion({
  register,
  handleSubmit,
  watch,
  errors,
  question,
  getValues,
  setCurrentAnswerAction,
}) {
  const dispatch = useDispatch();
  const questionBody = useSelector(
    (state: TRootState) =>
      state.questionBodyMultipleChoiceTable.byId[question.questionId]
  );
  const currentExam = useSelector((state: TRootState) => state.examTable);
  // const currentExam = useSelector((state: TRootState) => state.examTable);
  const { currentExamId, currentQuestionId } = useSelector(
    (state: TRootState) => state.examState
  );

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

  useEffect(() => {
    setCurrentAnswerAction(() => {
      return () => {
        // nested: true returns values as if they were submitted
        const selectedAnswers = makeSelectedAnswers(getValues({ nest: true }));
        console.log(selectedAnswers);
        console.log("selectedAnswers");
        return answerMultipleChoiceQuestion({
          questionId: currentQuestionId,
          selectedAnswers,
        });
      };
    });
  }, [question]);

  const { possibleAnswers } = questionBody;

  const onSubmit = (data) => {
    const selectedAnswers = makeSelectedAnswers(data);
    dispatch(
      answerMultipleChoiceQuestion({
        questionId: currentQuestionId,
        selectedAnswers,
      })
    );
    dispatch(setAnswerEndTime({ questionId: currentQuestionId }));
    dispatch(nextQuestion({ currentExam: currentExam.byId[currentExamId] }));
  };
  // console.log(watchAll);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {possibleAnswers.map((possibleAnswer, index) => {
        return (
          <div key={v4()}>
            <Label>
              {/* <Controller as={Checkbox} name={multipleChoiceFormName} /> */}
              <Checkbox
                defaultChecked={false}
                name={`multipleChoice[${index}]`}
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
