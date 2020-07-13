import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";

import { Textarea, Button, Input, Flex, Label, Checkbox } from "theme-ui";
import { TRootState } from "../../../types/examTypes";

export default function MakeMultipleChoice({
  register,
  handleSubmit,
  getValues,
  setCurrentAnswerAction,
  reset,
}) {
  /**
   * React Hooks
   */

  const [possibleAnswers, setPossibleAnswers] = useState([]);

  /**
   * Redux Hooks
   */
  const dispatch = useDispatch();
  const { currentQuestionId } = useSelector(
    (state: TRootState) => state.examState
  );
  const questionTable = useSelector((state: TRootState) => state.questionTable);
  const questionBodyMultipleChoiceTable = useSelector(
    (state: TRootState) => state.questionBodyMultipleChoiceTable
  );

  let question = undefined;
  let questionBody = undefined;

  if (currentQuestionId) {
    question = questionTable.byId[currentQuestionId];
    questionBody = questionBodyMultipleChoiceTable.byId[currentQuestionId];
  }

  /**
   * Form Hook
   */

  /**
   * Effect
   *
   */

  useEffect(() => {
    console.log("effect triggerd");
    setPossibleAnswers(questionBody.possibleAnswers);
  }, []);

  useEffect(() => {
    console.log("reset");
    reset();
  }, [possibleAnswers]);

  /**
   * Functions
   */

  const onSubmit = (data) => {
    console.log("submitted");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        sx={{
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Input
          ref={register}
          name={"questionTitle"}
          placeholder="Provide a Question Title here"
          defaultValue={question ? question.title : null}
        />
        <Textarea
          rows={5}
          name={"questionText"}
          placeholder={"Provide a question here."}
          ref={register}
          defaultValue={question ? question.text : null}
        />
        <Button
          sx={{ flexGrow: 0 }}
          onClick={() => {
            setPossibleAnswers((oldArray) => [...oldArray, ""]);
          }}
        >
          Add Answer
        </Button>

        {possibleAnswers.map((possibleAnswer, index) => {
          return (
            <div
              key={v4()}
              style={{ marginTop: "0.5rem", alignContent: "center" }}
            >
              <Flex
                sx={{
                  flexDirection: "row",
                  alignSelf: "stretch",
                }}
              >
                <Label>
                  {/* <Controller as={Checkbox} name={multipleChoiceFormName} /> */}
                  <Checkbox
                    sx={{ marginTop: "0.5rem" }}
                    defaultChecked={false}
                    name={`multipleChoiceAnswer_[${index}]`}
                    ref={register}
                  />
                  <Input
                    ref={register}
                    name={`multipleChoiceAnswerText_[${index}]`}
                    placeholder="Provide an Answer"
                    defaultValue={possibleAnswer ? possibleAnswer : null}
                  />
                </Label>
                <Button
                  sx={{ margin: "0", marginLeft: "0.5rem" }}
                  variant="warning"
                  onClick={() => {
                    setPossibleAnswers((old) => {
                      old.splice(index, 1);
                      return old;
                    });
                  }}
                >
                  x
                </Button>
              </Flex>
            </div>
          );
        })}
        <Flex>
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
        </Flex>
      </Flex>
    </form>
  );
}
