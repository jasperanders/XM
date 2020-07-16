import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import MakeFreeText from "./MakeFreeText";
import MakeMultipleChoice from "./MakeMultipleChoice";
import { TRootState } from "../../../types/examTypes";
import { questionTypes } from "../../../constants/constants";
import HttpService from "../../../services/http";
import apiRoutes from "../../../services/apiRoutes";

export default function Question({ questionType: questionTypeProp }) {
  /**
   * React Hooks
   */
  const [makeQuestionState, setMakeQuestionState] = useState({
    questionId: null,
    questionType: null,
  });
  const [questionBody, setQuestionBody] = useState(<></>);
  /**
   * Redux
   */
  const currentQuestionId = useSelector(
    (state: TRootState) => state.examState.currentQuestionId
  );
  const questionTable = useSelector((state: TRootState) => state.questionTable);

  /**
   * Hook Form
   */


  /**
   * Effects
   */
  useEffect(() => {
    if (!currentQuestionId) {
      setMakeQuestionState((oldState) => ({
        ...oldState,
        questionType: questionTypeProp,
      }));
    } else {
      setMakeQuestionState({
        questionId: currentQuestionId,
        questionType: questionTable.byId[currentQuestionId].questionType,
      });
    }
  }, [currentQuestionId, questionTypeProp]);

  useEffect(() => {
    const { questionType } = makeQuestionState;
    console.log("using questionType");
    console.log(questionType);
    switch (questionType) {
      case questionTypes[0].name:
        setQuestionBody(
          <MakeFreeText
            makeQuestion={makeQuestion}
            questionId={currentQuestionId}
          />
        );
        break;
      case questionTypes[1].name:
        setQuestionBody(
          <MakeMultipleChoice
            makeQuestion={makeQuestion}
            questionId={currentQuestionId}
          />
        );
        break;
      default:
        setQuestionBody(<div>Something went wrong</div>);
        break;
    }
  }, [makeQuestionState]);

  const makeQuestion = ({
    questionContent,
    bodyContent,
    makeBody,
    answerContent,
    makeAnswer,
  }) => {
    HttpService.post(apiRoutes.QUESTION, { content: questionContent })
      .then(({ data }) => {
        makeBody({ id: data.id, bodyContent });
        makeAnswer({ id: data.id, answerContent });
      })
      .catch((error) => {
        console.log("error make Question");
      });
  };

  return <div>{questionBody}</div>;
}
