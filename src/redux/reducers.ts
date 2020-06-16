import { combineReducers } from "@reduxjs/toolkit";
import {
  ANSWER_QUESTION,
  START_TIMER,
  END_TIMER,
  PREVIOUS_QUESTION,
  NEXT_QUESTION,
} from "./actions";
import { initialState } from "./initialState";
import { Question } from "../types/exam";

function answer(state: Array<Question>, { type, payload }) {
  switch (type) {
    case ANSWER_QUESTION:
      return state;

    default:
      return state;
  }
}

function time(state: number = 0, { type, payload }) {
  switch (type) {
    case START_TIMER:
      return state;

    case END_TIMER:
      return state;

    default:
      return state;
  }
}

const questions = combineReducers({
  answer,
  time,
});

function current(state = 0, { type, payload }) {
  switch (type) {
    case PREVIOUS_QUESTION:
      return state;
    case NEXT_QUESTION:
      return state;

    default:
      return state;
  }
}

function exam(state = initialState, { type, payload }) {
  switch (type) {
    case ANSWER_QUESTION:
      return { ...state, questions: answer(state.questions, payload) };

    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  exam,
});

export default rootReducer;
