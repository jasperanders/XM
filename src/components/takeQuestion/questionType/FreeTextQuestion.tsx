import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { freeTextFormName } from "../../../constants/constants";
import { Textarea, Button, Flex, Text } from "theme-ui";
import {
  answerFreeTextQuestion,
  nextQuestion,
  setAnswerEndTime,
} from "../../../redux/actions";
import { TRootState } from "../../../types/examTypes";

export default function FreeTexTFreeTextQuestion({
  question,
  setCurrentAnswerAction,
  modalState,
  setModalState,
}) {
  const { register, handleSubmit, reset, getValues } = useForm();

  /**
   * Redux Hooks
   */

  const dispatch = useDispatch();
  const currentExam = useSelector((state: TRootState) => state.examTable);
  const { currentExamId } = useSelector((state: TRootState) => state.examState);
  const answerTable = useSelector((state: TRootState) => state.answerTable);
  const [answerData, setAnswerData] = useState(null);

  const [currentWords, setCurrentWords] = useState(0);

  /**
   * Effect Hooks
   */

  useEffect(() => {
    setModalState({ ...modalState, continueModal: false });
    setAnswerData(null);
    reset();
    setCurrentWords(0);
    setCurrentAnswerAction(() => {
      return () => {
        // {nested: true} returns values as if they were submitted
        const answer = getValues({ nest: true })[freeTextFormName];

        return answerFreeTextQuestion({
          answerId: answerTable.byId[questionId].answerId,
          questionId: questionId,
          answer,
        });
      };
    });
  }, [question, getValues]);

  useEffect(() => {
    if (answerData && modalState.continueModal) {
      dispatchAnswerAction();
      setModalState({ ...modalState, showModal: false });
    }
  }, [answerData, modalState.continueModal]);

  const { questionId } = question;

  const dispatchAnswerAction = () => {
    try {
      const answer = answerData ? answerData[freeTextFormName] : undefined;
      const payload = {
        questionId,
        answerId: answerTable.byId[questionId].answerId,
        answer,
      };
      dispatch(answerFreeTextQuestion(payload));
      dispatch(
        setAnswerEndTime({
          questionId: question.questionId,
          answerId: answerTable.byId[questionId].answerId,
        })
      );
      dispatch(nextQuestion({ currentExam: currentExam.byId[currentExamId] }));
    } catch (e) {}
  };

  const onSubmit = (data) => {
    setAnswerData(data);
    setModalState({ ...modalState, showModal: true });
  };

  return (
    <Flex sx={{ flexDirection: "column" }}>
      <Text>{`Your current word count is: ${currentWords}`}</Text>
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
          onChange={() => {
            setCurrentWords(getValues()[freeTextFormName].split(" ").length);
          }}
        />
        <Button type="submit">Save and Next Question</Button>
      </form>
    </Flex>
  );
}
