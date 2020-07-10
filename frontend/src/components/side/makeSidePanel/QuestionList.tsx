import React from "react";
import { Styled } from "theme-ui";
import { TRootState } from "../../../types/examTypes";
import { useSelector } from "react-redux";

export const QuestionList = () => {
  const questions = useSelector((state: TRootState) => state.questionTable);

  return (
    <Styled.table>
      {questions.allIds.map((id, idx) => {
        const odd = idx % 2 === 0 ? "odd" : "even";
        return (
          <Styled.tr variant={odd}>
            <Styled.td>{questions.byId[id].title}</Styled.td>
            <Styled.td>{questions.byId[id].text}</Styled.td>
          </Styled.tr>
        );
      })}
    </Styled.table>
  );
};
