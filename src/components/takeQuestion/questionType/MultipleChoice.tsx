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
  modalState,
  setModalState,
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
  const answerTable = useSelector((state: TRootState) => state.answerTable);

  const { currentExamId, currentQuestionId } = useSelector(
    (state: TRootState) => state.examState
  );

  /**
   * React Hooks
   */

  const [answerData, setAnswerData] = useState(null);

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

  const dispatchAnswerAction = () => {
    const selectedAnswers = makeSelectedAnswers(answerData);
    dispatch(
      answerMultipleChoiceQuestion({
        questionId: question.questionId,
        answerId: answerTable.byId[currentQuestionId].answerId,
        selectedAnswers,
      })
    );
    dispatch(
      setAnswerEndTime({
        questionId: question.questionId,
        answerId: answerTable.byId[currentQuestionId].answerId,
      })
    );
    dispatch(nextQuestion({ currentExam: currentExam.byId[currentExamId] }));
  };

  /**
   * Effect Hooks
   */

  useEffect(() => {
    if (answerData && modalState.continueModal) {
      console.log(answerData);
      dispatchAnswerAction();
      setModalState({ ...modalState, showModal: false });
    }
  }, [answerData, modalState]);

  useEffect(() => {
    setModalState({ ...modalState, continueModal: false });
    setCurrentAnswerAction(() => {
      return () => {
        // {nested: true} returns values as if they were submitted
        const selectedAnswers = makeSelectedAnswers(getValues({ nest: true }));
        return answerMultipleChoiceQuestion({
          questionId: question.questionId,
          answerId: answerTable.byId[currentQuestionId].answerId,
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
    setAnswerData(data);
    setModalState({ ...modalState, showModal: true });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {questionState.possibleAnswers.map((possibleAnswer, index) => {
        return (
          <div key={v4()}>
            <Label>
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
