import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { freeTextFormName } from "../../../constants/constants";
import { Textarea, Button, Input, Grid } from "theme-ui";
import { answerFreeTextQuestion, nextQuestion } from "../../../redux/actions";
import { TRootState } from "../../../types/examTypes";
import { useForm } from "react-hook-form";

export default function FreeTexTFreeTextQuestion() {
  /**
   * Redux Hooks
   */

  const dispatch = useDispatch();
  const currentExam = useSelector((state: TRootState) => state.examTable);
  const { currentExamId } = useSelector((state: TRootState) => state.examState);

  /**
   * Form Hook
   */

  const { register, handleSubmit, watch, errors, reset, getValues } = useForm();

  /**
   * Effect Hooks
   */

  // useEffect(() => {
  //   setCurrentAnswerAction(() => {
  //     return () => {
  //       // {nested: true} returns values as if they were submitted
  //       const answer = getValues({ nest: true })[freeTextFormName];

  //       console.log(answer);
  //       console.log("selectedAnswers");
  //       return answerFreeTextQuestion({
  //         questionId: questionId,
  //         answer,
  //       });
  //     };
  //   });
  // }, [question]);

  // const { questionId } = question;

  const onSubmit = (data) => {
    console.log("submitted");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        ref={register}
        name={"questionTitle"}
        placeholder="Provide a Question Title here"
      />
      <Textarea
        rows={5}
        columns={5}
        name={"masterAnswer"}
        placeholder={"Provide a question here."}
        ref={register}
      />
      <Textarea
        rows={10}
        columns={20}
        name={"masterAnswer"}
        placeholder={"Provide master Answer here"}
        ref={register}
      />
      <Button
        sx={{ marginRight: "0.5rem" }}
        variant="warning"
        onClick={() => {
          reset();
        }}
      >
        Clear
      </Button>
      <Button type="submit">Save</Button>
    </form>
  );
}
