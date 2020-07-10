import React from "react";
import { Styled, Button } from "theme-ui";
import { TRootState } from "../../../types/examTypes";
import { useSelector } from "react-redux";

const QuestionList = () => {
  const questions = useSelector((state: TRootState) => state.questionTable);

  return (
    <Styled.table>
      {questions.allIds.map((id, idx) => {
        const odd = idx % 2 === 0 ? "odd" : "even";
        return (
          <Styled.tr variant={odd}>
            <Styled.td>{questions.byId[id].title}</Styled.td>
            <Styled.td>{questions.byId[id].text}</Styled.td>
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
        New Question
      </Button>
    </Styled.table>
  );
};

export default QuestionList;
