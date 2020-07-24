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
  allQuestions: [],
});

const ExamContextProvider = ({ children }) => {
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState({ rows: [] });
  const [allQuestions, setAllQuestions] = useState([]);
  const [allExams, setAllExams] = useState({ rows: [] });
  const [allFreeTextQuestion, setAllFreeTextQuestion] = useState({ rows: [] });
  const [allMultipleChoice, setAllMultipleChoice] = useState({ rows: [] });

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    if (user.role) {
      loadAllExams().then((questionIds) => {
        console.log("provided question ids", questionIds);
        // Provide all question Ids from User Exams
        loadQuestions(questionIds).then(() => {
          loadAllFreeText(questionIds).then(() => {
            loadAllMultipleChoice(questionIds).then(() => {
              // if user is Admin get all users for later use.
              if (user.role === "admin") {
                loadAllUsers()
                  .then(() => {
                    setLoading(false);
                  })
                  .catch(() => {});
              } else {
                setLoading(false);
              }
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

  const loadQuestions = (ids) => {
    return HttpService.post(apiRoutes.FIND_QUESTIONS, { ids: ids })
      .then(({ data }) => {
        console.log("find questions", data);
        setAllQuestions(data);

        /**
         * Define temporary tables
         */
        let newTable = { byId: {}, allIds: [] };
        let newAnswerTable = { byId: {}, allIds: [] };
        let newFreeTextAnswerTable = { byId: {}, allIds: [] };
        let newMultipleChoiceAnswerTable = { byId: {}, allIds: [] };

        /**
         * Create new Question Table for each Question
         */

        data.map(({ id: questionId, content }) => {
          // add questions via id
          newTable = {
            ...newTable,
            byId: {
              ...newTable.byId,
              [questionId]: {
                questionId: questionId,
                questionType: content.questionType,
                text: content.text,
                timeLimitMs: content.timeLimitMs,
                title: content.title,
              },
            },
          };
          newTable = { ...newTable, allIds: [...newTable.allIds, questionId] };

          // create new Answer Object for every question for user.
          HttpService.post(apiRoutes.ANSWER, {
            content: { questionId: questionId },
          }).then(({ data }) => {
            const { id: answerId } = data;

            console.log("answer data is", data);
            // set answer table
            newAnswerTable = {
              ...newAnswerTable,
              byId: {
                ...newAnswerTable.byId,
                [questionId]: {
                  questionId: questionId,
                  answerId: answerId,
                  timeStart: null,
                  timeEnd: null,
                  timeExpired: false,
                },
              },
            };
            newAnswerTable = {
              ...newAnswerTable,
              allIds: [...newAnswerTable.allIds, [questionId]],
            };

            // Create Answer bodies. But not in Backend yet.
            if (content.questionType === "freeText") {
              newFreeTextAnswerTable = {
                ...newFreeTextAnswerTable,
                byId: {
                  ...newFreeTextAnswerTable.byId,
                  [questionId]: {
                    questionId: questionId,
                    answerId: answerId,
                    answerText: "",
                  },
                },
              };
              newFreeTextAnswerTable = {
                ...newFreeTextAnswerTable,
                allIds: [...newFreeTextAnswerTable.allIds, questionId],
              };
            } else if (content.questionType === "multipleChoice") {
              newMultipleChoiceAnswerTable = {
                ...newMultipleChoiceAnswerTable,
                byId: {
                  ...newMultipleChoiceAnswerTable.byId,
                  [questionId]: {
                    questionId: questionId,
                    answerId: data._id,
                    selectedAnswers: "",
                  },
                },
              };
              newMultipleChoiceAnswerTable = {
                ...newMultipleChoiceAnswerTable,
                allIds: [...newMultipleChoiceAnswerTable.allIds, questionId],
              };
            }

            /**
             * Set temporary tables to Redux store.
             */
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
          });
        });
      })
      .catch("fetch questions failed");
  };

  const loadAllExams = () => {
    return HttpService.get(apiRoutes.EXAM)
      .then(({ data }) => {
        setAllExams(data);
        const newTable = { byId: {}, allIds: [] };
        const firstQuestionId = data?.rows[0]?.content?.questionsById[0];
        console.log("Exam data ", data);
        const firstExam = data?.rows[0]?._id;
        const allQuestions = [];

        data.rows.map(({ _id, content }) => {
          newTable.byId[_id] = {
            examId: _id,
            name: content.name,
            questionsById: content.questionsById,
          };
          newTable.allIds.push(_id);
          content.questionsById.map((el) => allQuestions.push(el));
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
        return allQuestions;
      })
      .catch("fetch Exams failed");
  };

  const loadAllFreeText = (questionIds) => {
    return HttpService.post(apiRoutes.FIND_FREE_TEXT_QUESTION, {
      ids: questionIds,
    })
      .then(({ data }) => {
        console.log("find freetext", data);
        setAllFreeTextQuestion(data);
        const newTable = { byId: {}, allIds: [] };
        data.map(({ _id, content }) => {
          newTable.byId[content.questionId] = {
            questionId: content.questionId,
          };
          newTable.allIds.push(content.questionId);
        });
        dispatch(setQuestionBodyFreeTextTable({ newTable }));
      })
      .catch("fetch free text failed");
  };

  const loadAllMultipleChoice = (questionIds) => {
    return HttpService.post(apiRoutes.FIND_MULTIPLE_CHOICE_QUESTION, {
      ids: questionIds,
    })
      .then(({ data }) => {
        console.log("find multiple", data);
        setAllMultipleChoice(data);
        const newTable = { byId: {}, allIds: [] };
        data.map(({ _id, content }) => {
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
