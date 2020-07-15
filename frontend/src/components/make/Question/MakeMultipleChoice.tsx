import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";

import { Textarea, Button, Input, Flex, Label, Checkbox } from "theme-ui";
import { TRootState } from "../../../types/examTypes";
import { multipleChoiceFormName } from "../../../constants/constants";

export default function MakeMultipleChoice({
  register,
  handleSubmit,
  getValues,
  reset,
  questionId,
}) {
  /**
   * React Hooks
   */

  const [multipeChoiceState, setMultipeChoiceState] = useState({
    title: "",
    text: "",
    possibleAnswers: ["", ""],
  });

  /**
   * Redux Hooks
   */
  const dispatch = useDispatch();
  const questionTable = useSelector((state: TRootState) => state.questionTable);
  const questionBodyMultipleChoiceTable = useSelector(
    (state: TRootState) => state.questionBodyMultipleChoiceTable
  );

  let question = undefined;
  let questionBody = undefined;

  /**
   * Form Hook
   */

  /**
   * Effect
   *
   */

  useEffect(() => {
    if (questionId) {
      setMultipeChoiceState({
        title: question.title,
        text: question.text,
        possibleAnswers: questionBody.possibleAnswers,
      });
    } else {
      setMultipeChoiceState({
        title: "",
        text: "",
        possibleAnswers: ["", ""],
      });
    }
  }, [questionId]);

  useEffect(() => {
    reset();
  }, [multipeChoiceState.possibleAnswers]);

  /**
   * Functions
   */

  const onSubmit = (data) => {
    console.log("submitted");
  };

  const { possibleAnswers, title, text } = multipeChoiceState;

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
          defaultValue={title}
        />
        <Textarea
          rows={5}
          name={"questionText"}
          placeholder={"Provide a question here."}
          ref={register}
          defaultValue={text}
        />
        <Button
          sx={{ flexGrow: 0 }}
          onClick={() => {
            setMultipeChoiceState((old) => ({
              ...old,
              possibleAnswers: [...old.possibleAnswers, ""],
            }));
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
                    setMultipeChoiceState((old) => {
                      old.possibleAnswers.splice(index, 1);
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
