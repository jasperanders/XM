import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FreeTextQuestion from "./questionType/FreeTextQuestion";
import MultipleChoiceQuestion from "./questionType/MultipleChoice";
import { TQuestion, TRootState } from "../../types/examTypes";
import { Heading, Text } from "theme-ui";
import Modal from "../layout/basics/modal";
import Timer from "../timer/Timer"; //!Important
import { setAnswerStartTime } from "../../redux/actions";

export default function Question({ question }: TProps) {
  const [currentAnswerAction, setCurrentAnswerAction] = useState(() => {});
  const { questionId, questionType, title, text } = question;

  const [modalState, setModalState] = useState({
    showModal: false,
    continueModal: false,
  });

  const dispatch = useDispatch();
  const { currentExamId } = useSelector((state: TRootState) => state.examState);
  const currentExam = useSelector(
    (state: TRootState) => state.examTable.byId[currentExamId]
  );
  const answerTable = useSelector((state: TRootState) => state.answerTable);

  useEffect(() => {
    dispatch(
      setAnswerStartTime({
        questionId,
        answerId: answerTable.byId[questionId].answerId,
      })
    );
  }, [questionId, dispatch]);

  const questionBody = () => {
    switch (questionType) {
      case "freeText":
        return (
          <FreeTextQuestion
            modalState={modalState}
            setModalState={setModalState}
            question={question}
            setCurrentAnswerAction={setCurrentAnswerAction}
          />
        );
      case "multipleChoice":
        return (
          <MultipleChoiceQuestion
            modalState={modalState}
            setModalState={setModalState}
            question={question}
            setCurrentAnswerAction={setCurrentAnswerAction}
          />
        );
      default:
        return <div>Something went wrong</div>;
    }
  };
  return (
    <div>
      {modalState.showModal && (
        <Modal
          setShowModal={(showModal) => {
            setModalState({ ...modalState, showModal });
          }}
          handleOk={() => setModalState({ ...modalState, continueModal: true })}
          timeModal={1500}
        >
          <Heading>Your answer was submitted</Heading>
          <Text>You can now continue your exam.</Text>
        </Modal>
      )}
      <Heading as={"h2"}>{title}</Heading>
      <p>{text}</p>
      {questionBody()}
      <Timer
        setContinueModal={() =>
          setModalState({ ...modalState, continueModal: true })
        }
        continueModal={modalState.continueModal}
        questionId={questionId}
        currentExam={currentExam}
        answerQuestionAction={currentAnswerAction}
      ></Timer>
    </div>
  );
}

interface TProps {
  question: TQuestion;
}
