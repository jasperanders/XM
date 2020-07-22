import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Textarea, Button, Input, Grid } from "theme-ui";
import { TRootState } from "../../../types/examTypes";
import HttpService from "../../../services/http";
import apiRoutes from "../../../services/apiRoutes";
import { useForm } from "react-hook-form";

export default function MakeFreeText({ makeQuestion, questionId }) {
  /**
   * React Hooks
   */
  const [makeFreeTextState, setMakeFreeTextState] = useState({
    title: null,
    questionText: null,
    masterAnswer: null,
    points: null,
  });

  /**
   * Redux Hooks
   */

  const dispatch = useDispatch();
  const questionTable = useSelector((state: TRootState) => state.questionTable);
  /**
   * Form Hook
   */
  const { register, handleSubmit, watch, errors, reset, getValues } = useForm();

  useEffect(() => {
    if (questionId !== null) {
      setMakeFreeTextState({
        title: questionTable.byId[questionId].title,
        questionText: questionTable.byId[questionId].text,
        masterAnswer: "",
        points: 0,
      });
    } else {
      setMakeFreeTextState(() => ({
        title: "",
        questionText: "",
        masterAnswer: "",
        points: null,
      }));
    }
    reset();
  }, [questionId]);

  const makeBody = ({ id, bodyContent }) => {
    HttpService.post(apiRoutes.FREE_TEXT_QUESTION, {
      content: { questionId: id },
    }).catch(() => {
      console.error("error make body");
    });
  };

  const makeAnswer = ({ id, answerContent }) => {
    const answerData = { questionId: id, master: true };
    const answerBody = { questionId: id, answerText: answerContent.text };
    HttpService.post(apiRoutes.ANSWER, { content: answerData })
      .then(({ data }) => {
        HttpService.post(apiRoutes.FREE_TEXT_ANSWER, {
          content: {
            answerId: data.id,
            ...answerBody,
          },
        }).catch(() => {
          console.error("error make answer body");
        });
      })
      .catch(() => {
        console.error("error make answer");
      });
  };

  const onSubmit = (data) => {
    const questionData = {
      timeLimitMs: 50000,
      questionType: "freeText",
      title: data.questionTitle,
      text: data.questionText,
      points: data.questionPoints,
    };
    makeQuestion({
      questionContent: questionData,
      bodyContent: {},
      makeBody,
      answerContent: { text: data.masterAnswer },
      makeAnswer,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        ref={register}
        name={"questionTitle"}
        placeholder="Provide a Question Title here"
        defaultValue={makeFreeTextState.title}
      />
      <Textarea
        rows={5}
        name={"questionText"}
        placeholder={"Provide a question here."}
        ref={register}
        defaultValue={makeFreeTextState.questionText}
      />
      <Textarea
        rows={10}
        name={"masterAnswer"}
        placeholder={"Provide master Answer here"}
        defaultValue={makeFreeTextState.masterAnswer}
        ref={register}
      />
      <Input
        ref={register}
        name={"questionPoints"}
        type="number"
        placeholder="Points"
        defaultValue={makeFreeTextState.points}
      />
      <Button sx={{ marginRight: "0.5rem" }} variant="warning" onClick={reset}>
        Reset
      </Button>
      <Button type="submit">Save</Button>
    </form>
  );
}
