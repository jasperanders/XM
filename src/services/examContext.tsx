import React, { useState, useEffect, useContext } from "react";
import { v4 } from "uuid";
import HttpService, { storedAuthToken } from "./http";
import apiRoutes from "./apiRoutes";
import { useDispatch } from "react-redux";
import {
  setExamTable,
  setQuestionTable,
  setAnswerBodyFreeTextTable,
  setQuestionBodyFreeTextTable,
  setQuestionBodyMultipleChoiceTable,
  setCurrentQuestionId,
  setExamState,
  setAnswerTable,
  setAnswerBodyMultipleChoiceTable,
} from "../redux/actions";
import { UserContext } from "./userContext";

// Initializes the Context. This constant must be imported, wherever
// you need to access the user context
export const ExamContext = React.createContext({
  loading: true,
  loadAllUsers: () => {},
  allUsers: { rows: [] },
  allQuestions: { rows: [] },
});

const ExamContextProvider = ({ children }) => {
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState({ rows: [] });
  const [allQuestions, setAllQuestions] = useState({ rows: [] });
  const [allExams, setAllExams] = useState({ rows: [] });
  const [allFreeTextQuestion, setAllFreeTextQuestion] = useState({ rows: [] });
  const [allMultipleChoice, setAllMultipleChoice] = useState({ rows: [] });

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    if (user.role) {
      loadAllQuestions().then(() => {
        loadAllFreeText().then(() => {
          loadAllMultipleChoice().then(() => {
            loadAllExams().then(() => {
              loadAllUsers()
                .then(() => {
                  setLoading(false);
                })
                .catch(() => {
                  setLoading(false);
                });
            });
          });
        });
      });
    }
  }, [user]);

  /**
   * Load Tables
   *
   */
  const loadAllUsers = () => {
    return HttpService.get(apiRoutes.USER)
      .then(({ data }) => {
        setAllUsers(data);
      })
      .catch("fetch users failed");
  };

  const loadAllQuestions = () => {
    return HttpService.get(apiRoutes.QUESTION)
      .then(({ data }) => {
        setAllQuestions(data);
        const newTable = { byId: {}, allIds: [] };
        const newAnswerTable = { byId: {}, allIds: [] };
        const newFreeTextAnswerTable = { byId: {}, allIds: [] };
        const newMultipleChoiceAnswerTable = { byId: {}, allIds: [] };
        data.rows.map(({ _id, content }) => {
          newTable.byId[_id] = {
            questionId: _id,
            questionType: content.questionType,
            text: content.text,
            timeLimitMs: content.timeLimitMs,
            title: content.title,
          };
          newTable.allIds.push(_id);
          const newAnswerId = v4();
          newAnswerTable.byId[_id] = {
            questionId: _id,
            answerId: newAnswerId,
            timeStart: null,
            timeEnd: null,
            timeExpired: false,
          };
          newAnswerTable.allIds.push(_id);
          if (content.questionType === "freeText") {
            newFreeTextAnswerTable.byId[_id] = {
              questionId: _id,
              answerId: newAnswerId,
              answerText: "",
            };
            newFreeTextAnswerTable.allIds.push(newAnswerId);
          } else if (content.questionType === "multipleChoice") {
            newMultipleChoiceAnswerTable.byId[_id] = {
              questionId: _id,
              answerId: newAnswerId,
              selectedAnswers: "",
            };
            newMultipleChoiceAnswerTable.allIds.push(newAnswerId);
          }
        });
        dispatch(setQuestionTable({ newTable }));
        dispatch(setAnswerTable({ newTable: newAnswerTable }));
        dispatch(
          setAnswerBodyFreeTextTable({ newTable: newFreeTextAnswerTable })
        );
        dispatch(
          setAnswerBodyMultipleChoiceTable({
            newTable: newMultipleChoiceAnswerTable,
          })
        );
      })
      .catch("fetch questions failed");
  };

  const loadAllExams = () => {
    return HttpService.get(apiRoutes.EXAM)
      .then(({ data }) => {
        console.log(data);
        setAllExams(data);
        const newTable = { byId: {}, allIds: [] };
        const firstQuestionId = data?.rows[0]?.content?.questionsById[0];
        const firstExam = data?.rows[0]?._id;

        data.rows.map(({ _id, content }) => {
          newTable.byId[_id] = {
            examId: _id,
            name: content.name,
            questionsById: content.questionsById,
          };
          newTable.allIds.push(_id);
        });
        dispatch(setExamTable({ newTable }));
        dispatch(
          setExamState({
            newTable: {
              currentExamId: firstExam,
              currentQuestionIndex: 0,
              currentQuestionId: firstQuestionId,
              currentTime: null,
              timerIsActive: true,
              examFinished: false,
            },
          })
        );
      })
      .catch("fetch Exams failed");
  };

  const loadAllFreeText = () => {
    return HttpService.get(apiRoutes.FREE_TEXT_QUESTION)
      .then(({ data }) => {
        setAllFreeTextQuestion(data);
        const newTable = { byId: {}, allIds: [] };
        data.rows.map(({ _id, content }) => {
          newTable.byId[content.questionId] = {
            questionId: content.questionId,
          };
          newTable.allIds.push(content.questionId);
        });
        dispatch(setQuestionBodyFreeTextTable({ newTable }));
      })
      .catch("fetch free text failed");
  };

  const loadAllMultipleChoice = () => {
    return HttpService.get(apiRoutes.MULTIPLE_CHOICE_QUESTION)
      .then(({ data }) => {
        setAllMultipleChoice(data);
        const newTable = { byId: {}, allIds: [] };
        data.rows.map(({ _id, content }) => {
          console.log(content);
          newTable.byId[content.questionId] = {
            questionId: content.questionIds,
            possibleAnswers: content.possibleAnswers,
          };
          newTable.allIds.push(content.questionId);
        });
        console.log("newTable", newTable);
        dispatch(setQuestionBodyMultipleChoiceTable({ newTable }));
      })
      .catch("fetch multi failed");
  };

  // For more details on how the React Context API works, take a look at https://reactjs.org/docs/context.html
  // In this case we provide an user object and both the load- and wipe-user function to the react context.
  // In order to access the right component scope we also need to bind the this-context. In a case, where we don't
  // do that the function cannot access the component state and thus cannot change the user-context.
  return (
    <ExamContext.Provider
      value={{
        loading,
        allQuestions,
        loadAllUsers,
        allUsers,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
};

export default ExamContextProvider;
