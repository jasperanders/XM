import { combineReducers } from "@reduxjs/toolkit";
import produce from "immer";
import {
  ANSWER_FREE_TEXT_QUESTION,
  SET_QUESTION_START_TIME,
  SET_QUESTION_END_TIME,
  PREVIOUS_QUESTION,
  NEXT_QUESTION,
  SET_APP_TIMER,
  COUNT_DOWN_APP_TIMER,
} from "./actions";
import { initialAppState, initialExam, initialQuestions } from "./initialState";
import { store } from "..";
import { useDispatch } from "react-redux";

function questions(state = initialQuestions, { type, payload }) {
  switch (type) {
    case ANSWER_FREE_TEXT_QUESTION:
      return produce(state, (draftState) => {
        let question = draftState.byId[payload.questionId];
        question.answerText = payload.answerText;
        question.timeExpired = true;
      });

    case SET_QUESTION_START_TIME:
      return produce(state, (draftState) => {
        let question = draftState.byId[payload.questionId];
        if (question.timeStart === null) {
          question.timeStart = Date.now();
        }
      });
    case SET_QUESTION_END_TIME:
      return produce(state, (draftState) => {
        let question = draftState.byId[payload.questionId];
        question.timeEnd = Date.now();
        question.timeUsed = question.timeEnd - question.timeStart;
      });

    default:
      return state;
  }
}

function exams(state = initialExam, { type, payload }) {
  switch (type) {
    case NEXT_QUESTION:
      return produce(state, (draft) => {
        const { id, currentQuestionIndex } = draft.currentExam;
        const examLength = draft.byId[id].questionsById.length;
        if (currentQuestionIndex < examLength - 1) {
          draft.currentExam.currentQuestionIndex += 1;
        }
      });
    default:
      return state;
  }
}

function appState(state = initialAppState, { type, payload }) {
  switch (type) {
    case SET_APP_TIMER:
      return produce(state, (draftState) => {
        draftState.currentTime = payload.timeLimit;
        return draftState;
      });

    case COUNT_DOWN_APP_TIMER:
      return produce(state, (draftState) => {
        if (draftState.currentTime > 0) {
          draftState.currentTime -= payload.countDownBy;
          return draftState;
        } else {
          console.log("TimeOut");
        }
      });
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  exams,
  questions,
  appState,
});

export default rootReducer;
