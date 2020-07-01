import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { freeTextFormName } from "../../../constants/constants";
import { Textarea, Button } from "theme-ui";
import { answerFreeTextQuestion, nextQuestion } from "../../../redux/actions";
import { TRootState } from "../../../types/examTypes";

export default function FreeTexTFreeTextQuestion({
  register,
  handleSubmit,
  question,
  getValues,
  setCurrentAnswerAction,
}) {
  /**
   * Redux Hooks
   */

  const dispatch = useDispatch();
  const currentExam = useSelector((state: TRootState) => state.examTable);
  const { currentExamId } = useSelector((state: TRootState) => state.examState);

  /**
   * Effect Hooks
   */

  useEffect(() => {
    setCurrentAnswerAction(() => {
      return () => {
        // {nested: true} returns values as if they were submitted
        const answer = getValues({ nest: true })[freeTextFormName];

        console.log(answer);
        console.log("selectedAnswers");
        return answerFreeTextQuestion({
          questionId: questionId,
          answer,
        });
      };
    });
  }, [question]);

  const { questionId } = question;

  const onSubmit = (data) => {
    const answer = data[freeTextFormName];
    const payload = { questionId, answer };
    dispatch(answerFreeTextQuestion(payload));
    dispatch(nextQuestion({ currentExam: currentExam.byId[currentExamId] }));
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
