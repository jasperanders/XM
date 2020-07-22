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
  const [questionState, setQuestionState] = useState({
    possibleAnswers: [],
  });

  const questionBodyTable = useSelector(
    (state: TRootState) => state.questionBodyMultipleChoiceTable
  );

  const currentExam = useSelector((state: TRootState) => state.examTable);

  const { currentExamId, currentQuestionId } = useSelector(
    (state: TRootState) => state.examState
  );

  /**
   * miscellaneous functions
   */

  const makeSelectedAnswers = (data) => {
    const { multipleChoice } = data;
    let selectedAnswers = [];
    questionState.possibleAnswers.forEach((el, i) => {
      if (data.multipleChoice[i]) {
        selectedAnswers.push(el);
      }
    });
    return selectedAnswers;
  };

  /**
   * Effect Hooks
   */

  useEffect(() => {
    console.log(questionBodyTable);
    console.log(question);
    setCurrentAnswerAction(() => {
      return () => {
        // {nested: true} returns values as if they were submitted
        const selectedAnswers = makeSelectedAnswers(getValues({ nest: true }));
        return answerMultipleChoiceQuestion({
          questionId: question.questionId,
          selectedAnswers,
        });
      };
    });
    setQuestionState((old) => {
      return {
        ...old,
        possibleAnswers:
          questionBodyTable.byId[question.questionId].possibleAnswers,
      };
    });
  }, [question]);

  /**
   * Destructuring
   */
  const onSubmit = (data) => {
    const selectedAnswers = makeSelectedAnswers(data);
    dispatch(
      answerMultipleChoiceQuestion({
        questionId: question.questionId,
        selectedAnswers,
      })
    );
    dispatch(setAnswerEndTime({ questionId: question.questionId }));
    dispatch(nextQuestion({ currentExam: currentExam.byId[currentExamId] }));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {questionState.possibleAnswers.map((possibleAnswer, index) => {
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
