import { combineReducers } from "@reduxjs/toolkit";
import produce from "immer";
import {
  ANSWER_QUESTION,
  START_TIMER,
  END_TIMER,
  PREVIOUS_QUESTION,
  NEXT_QUESTION,
} from "./actions";
import { initialAppState, initialExam, initialQuestions } from "./initialState";

function questions(state = initialQuestions, { type, payload }) {
  switch (type) {
    case ANSWER_QUESTION:
      const { answerText } = payload;
      const nextState = produce(state, (draftState) => {
        draftState.byId["question_01"].answerText = answerText;
      });
      return nextState;

    default:
      return state;
  }
}

function exams(state = initialExam, { type, payload }) {
  switch (type) {
    default:
      return state;
  }
}

function appState(state = initialAppState, { type, payload }) {
  switch (type) {
    case PREVIOUS_QUESTION:
      return state;
    case NEXT_QUESTION:
      return state;

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
