import React from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { Heading, Progress, Flex } from "theme-ui";
import { TRootState } from "../../types/exam";

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
        flexDirection: "column",
      }}
    >
      <Heading as="h1" sx={{ marginBottom: "2rem" }}>
        {exams.byId[exams.currentExam.id].name}
      </Heading>
      <Progress max={questionsById.length} value={currentQuestionIndex} />
    </Flex>
  );
}
