import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";

import { Textarea, Button, Input, Flex, Label, Checkbox } from "theme-ui";
import { TRootState } from "../../../types/examTypes";
import { multipleChoiceFormName } from "../../../constants/constants";
import HttpService from "../../../services/http";
import apiRoutes from "../../../services/apiRoutes";
import { useForm, Controller } from "react-hook-form";

export default function MakeMultipleChoice({ makeQuestion, questionId }) {
  /**
   * React Hooks
   */

  const [multipleChoiceState, setMultipleChoiceState] = useState({
    title: "",
    text: "",
    possibleAnswers: ["", ""],
    points: null,
  });

  /**
   * Redux Hooks
   */
  const questionTable = useSelector((state: TRootState) => state.questionTable);
  const questionBodyMultipleChoiceTable = useSelector(
    (state: TRootState) => state.questionBodyMultipleChoiceTable
  );

  /**
   * Form Hook
   */
  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    reset,
    getValues,
  } = useForm();

  /**
   * Effect
   *
   */

  useEffect(() => {
    if (questionId !== null) {
      setMultipleChoiceState({
        title: questionTable.byId[questionId].title,
        text: questionTable.byId[questionId].text,
        possibleAnswers:
          questionBodyMultipleChoiceTable.byId[questionId].possibleAnswers,
        points: null,
      });
    } else {
      setMultipleChoiceState({
        title: "",
        text: "",
        possibleAnswers: ["", ""],
        points: null,
      });
    }
  }, [questionId]);

  useEffect(() => {
    reset();
  }, [multipleChoiceState.possibleAnswers]);

  /**
   * Functions
   */

  const checkedIndex = (possible, correct) => {
    const res = [];
    possible.map((el, idx) => {
      el === correct[idx] ? res.push(true) : res.push(false);
    });
    return res;
  };

  const checkedSolutions = (possible, correct) => {
    const res = [];
    possible.map((el, idx) => {
      if (correct[idx]) res.push(el);
    });
    return res;
  };

  const makeBody = ({ id, bodyContent }) => {
    HttpService.post(apiRoutes.MULTIPLE_CHOICE_QUESTION, {
      content: { questionId: id, possibleAnswers: bodyContent.possibleAnswers },
    }).catch(() => {
      console.error("error make body");
    });
  };

  const makeAnswer = ({ id, answerContent }) => {
    const answerData = { questionId: id, master: true };
    const answerBody = {
      questionId: id,
      answers: answerContent.selectedAnswers,
    };
    HttpService.post(apiRoutes.ANSWER, { content: answerData })
      .then(({ data }) => {
        HttpService.post(apiRoutes.MULTIPLE_CHOICE_ANSWER, {
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
    const selectedAnswers = checkedSolutions(
      data.multipleChoiceAnswerText,
      data.multipleChoiceAnswer
    );
    const questionData = {
      timeLimitMs: 50000,
      questionType: "multipleChoice",
      title: data.questionTitle,
      text: data.questionText,
      points: data.questionPoints,
    };
    makeQuestion({
      questionContent: questionData,
      bodyContent: { possibleAnswers: data.multipleChoiceAnswerText },
      makeBody,
      answerContent: { selectedAnswers },
      makeAnswer,
    });
  };

  const { possibleAnswers, title, text } = multipleChoiceState;

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
            setMultipleChoiceState((old) => ({
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
                  <Controller
                    sx={{ marginTop: "0.5rem" }}
                    as={Checkbox}
                    name={`multipleChoiceAnswer[${index}]`}
                    control={control}
                    defaultValue={false}
                  />
                  <Input
                    ref={register}
                    name={`multipleChoiceAnswerText[${index}]`}
                    placeholder="Provide an Answer"
                    defaultValue={possibleAnswer ? possibleAnswer : null}
                  />
                </Label>
                <Button
                  sx={{ margin: "0", marginLeft: "0.5rem" }}
                  variant="warning"
                  onClick={() => {
                    setMultipleChoiceState((old) => {
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
        <Input
          sx={{ marginTop: "0.5rem", maxWidth: "20%" }}
          ref={register}
          name={"questionPoints"}
          type="number"
          placeholder="Points"
          defaultValue={multipleChoiceState.points}
        />
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
