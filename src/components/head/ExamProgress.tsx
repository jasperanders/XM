import React from "react";
import { useSelector } from "react-redux";
import { Heading, Progress, Flex } from "theme-ui";
import { TRootState } from "../../types/examTypes";

export default function ExamProgress() {
  const exams = useSelector((state: TRootState) => state.examTable);
  const { currentExamId, currentQuestionIndex } = useSelector(
    (state: TRootState) => state.examState
  );

  const questionsById = exams.byId[currentExamId].questionsById;

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
        {exams.byId[currentExamId].name}
      </Heading>
      <Progress max={questionsById.length} value={currentQuestionIndex + 1} />
    </Flex>
  );
}
