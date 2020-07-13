import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Textarea, Button, Input, Grid } from "theme-ui";
import { TRootState } from "../../../types/examTypes";

export default function MakeFreeText({
  register,
  handleSubmit,
  getValues,
  setCurrentAnswerAction,
  reset,
  questionId,
}) {
  /**
   * React Hooks
   */
  const [makeFreeTextState, setMakeFreeTextState] = useState({
    title: null,
    questionText: null,
    masterAnswer: null,
  });

  /**
   * Redux Hooks
   */

  const dispatch = useDispatch();
  const questionTable = useSelector((state: TRootState) => state.questionTable);
  
  /**
   * Form Hook
   */

  useEffect(() => {
    if (questionId) {
      setMakeFreeTextState({
        title: questionTable.byId[questionId].title,
        questionText: questionTable.byId[questionId].text,
        masterAnswer: "",
      });
    } else {
      setMakeFreeTextState({
        title: null,
        questionText: null,
        masterAnswer: null,
      });
    }
    reset();
  }, [questionId]);

  const onSubmit = () => {
    console.log("submitted");
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
      <Button
        sx={{ marginRight: "0.5rem" }}
        variant="warning"
        onClick={() => {
          reset();
        }}
      >
        Reset
      </Button>
      <Button type="submit">Save</Button>
    </form>
  );
}
