import React from "react";
import { Styled, Button } from "theme-ui";
import { TRootState } from "../../../../types/examTypes";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentQuestionId } from "../../../../redux/actions";

const QuestionList = () => {
  const questions = useSelector((state: TRootState) => state.questionTable);

  const dispatch = useDispatch();

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
                  dispatch(
                    setCurrentQuestionId({
                      newQuestionId: id,
                      newQuestionIndex: null,
                    })
                  );
                }}
              >
                Show
              </Button>
            </Styled.td>
          </Styled.tr>
        );
      })}
      <Button
        onClick={() =>
          dispatch(
            setCurrentQuestionId({
              newQuestionId: null,
              newQuestionIndex: null,
            })
          )
        }
      >
        New question
      </Button>
    </Styled.table>
  );
};

export default QuestionList;
