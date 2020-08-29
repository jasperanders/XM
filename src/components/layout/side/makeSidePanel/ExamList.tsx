import React from "react";
import { TRootState } from "../../../../types/examTypes";
import { useSelector } from "react-redux";
import { Button, Styled } from "theme-ui";

const ExamList = () => {
  const exams = useSelector((state: TRootState) => state.examTable);

  return (
    <Styled.table>
      {exams.allIds.map((id, idx) => {
        const odd = idx % 2 === 0 ? "odd" : "even";
        return (
          <Styled.tr variant={odd}>
            <Styled.td>{exams.byId[id].name}</Styled.td>
            <Styled.td>Date</Styled.td>
            <Styled.td>
              <Button
                variant="tiny"
                onClick={() => {
                  console.log("dispatch set current question");
                }}
              >
                Edit
              </Button>
            </Styled.td>
          </Styled.tr>
        );
      })}
      <Button onclick={() => console.log("Dispatch set currentQuestion Null")}>
        New Exam
      </Button>
    </Styled.table>
  );
};

export default ExamList;
