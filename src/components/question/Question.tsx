import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import FreeTextQuestion from "./questionType/FreeTextQuestion";
import {
  TFreeTextQuestion,
  TRootState,
  TMultipleChoiceQuestion,
} from "../../types/exam";
import { Heading } from "theme-ui";
import {
  answerFreeTextQuestion,
  seTFreeTextQuestionStartTime,
  seTFreeTextQuestionEndTime,
  nexTFreeTextQuestion,
} from "../../redux/actions";
import Timer from "../timer/Timer";
import { freeTextFromName } from "../../constants/formConstants";

export default function Question({ question }: TProps) {
  const dispatch = useDispatch();
  const { currentExam, byId } = useSelector((state: TRootState) => state.exams);
  const { register, handleSubmit, watch, errors, reset } = useForm();

  const { questionId, answerType, questionText, questionTitle } = question;
  useEffect(() => {
    dispatch(seTFreeTextQuestionStartTime({ questionId }));
    reset();
  }, [questionId]);

  const onSubmit = (data) => {
    let action = undefined;
    switch (answerType) {
      case "freeText":
        const answer = data[freeTextFromName];
        const payload = { questionId, answer };
        action = answerFreeTextQuestion(payload);
        break;

      default:
        break;
    }

    dispatch(action);
    dispatch(seTFreeTextQuestionEndTime({ questionId }));
    dispatch(nexTFreeTextQuestion());
  };

  const questionBody = () => {
    switch (answerType) {
      case "freeText":
        return (
          <FreeTextQuestion
            register={register}
            handleSubmit={handleSubmit}
            watch={watch}
            errors={errors}
            onSubmit={onSubmit}
            question={question}
          />
        );
      default:
        return <div>Something went wrong</div>;
    }
  };

  return (
    <div>
      <Heading as={"h2"}>{questionTitle}</Heading>
      <p>{questionText}</p>
      {questionBody()}
      <Timer question={question}></Timer>
    </div>
  );
}

interface TProps {
  question: TFreeTextQuestion | TMultipleChoiceQuestion;
}
