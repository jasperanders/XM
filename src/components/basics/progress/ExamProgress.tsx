import React from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { Box, Progress, Flex } from "theme-ui";
import { TRootState } from "../../../types/exam";

export default function ExamProgress() {
  const exams = useSelector((state: TRootState) => state.exams);
  const questionsById = exams.byId[exams.currentExam.id].questionsById;
  const currentQuestionIndex = exams.currentExam.currentQuestionIndex;

  return (
    <Flex
      sx={{
        alignItems: "center",
        justifyContent: "center",
        background: "primary",
        margin: "1rem",
        marginTop: "3rem",
      }}
    >
      <Progress max={questionsById.length} value={currentQuestionIndex} />
    </Flex>
  );
}
