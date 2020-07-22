import { combineReducers } from "@reduxjs/toolkit";
import produce from "immer";
import {
  ANSWER_FREE_TEXT_QUESTION,
  ANSWER_MULTIPLE_CHOICE_QUESTION,
  SET_ANSWER_START_TIME,
  SET_ANSWER_END_TIME,
  NEXT_QUESTION,
  SET_APP_TIMER,
  COUNT_DOWN_APP_TIMER,
  SET_CURRENT_QUESTION_ID,
  SET_ANSWER_TABLE,
  SET_EXAM_TABLE,
  SET_EXAM_STATE,
  SET_QUESTION_BODY_MULTIPLE_CHOICE_TABLE,
  SET_QUESTION_BODY_FREE_TEXT_TABLE,
  SET_ANSWER_BODY_MULTIPLE_CHOICE_TABLE,
  SET_ANSWER_BODY_FREE_TEXT_TABLE,
  SET_QUESTION_TABLE,
} from "./actions";
import {
  initialAnswerTable,
  initialExamState,
  initialExamTable,
  initialQuestionTable,
  initialAnswerBodyMultipleChoiceTable,
  initialQuestionBodyMultipleChoiceTable,
  initialAnswerBodyFreeTextTable,
  initialQuestionBodyFreeTextTable,
} from "./initialState";
import { history } from "../App";

// ================= Basic Tables =====================

function questionTable(state = initialQuestionTable, { type, payload }) {
  switch (type) {
    case SET_QUESTION_TABLE:
      return produce(state, (d) => {
        d = payload.newTable;
        return d;
      });
    default:
      return state;
  }
}

function answerTable(state = initialAnswerTable, { type, payload }) {
  switch (type) {
    case SET_ANSWER_TABLE:
      return produce(state, (d) => {
        d = payload.newTable;
        return d;
      });
    case SET_ANSWER_START_TIME:
      return produce(state, (d) => {
        const answer = d.byId[payload.questionId];
        if (answer.timeStart === null) {
          answer.timeStart = Date.now();
        }
      });
    case SET_ANSWER_END_TIME:
      return produce(state, (d) => {
        let answer = d.byId[payload.questionId];
        answer.timeEnd = Date.now();
        answer.timeExpired = true;
      });

    default:
      return state;
  }
}

function examTable(state = initialExamTable, { type, payload }) {
  switch (type) {
    case SET_EXAM_TABLE:
      return produce(state, (d) => {
        d = payload.newTable;
        return d;
      });
    default:
      return state;
  }
}

function examState(state = initialExamState, { type, payload }) {
  switch (type) {
    case SET_EXAM_STATE:
      return produce(state, (d) => {
        d = payload.newTable;
        return d;
      });
    case NEXT_QUESTION:
      return produce(state, (d) => {
        if (
          payload.currentExam.questionsById.length >
          d.currentQuestionIndex + 1 // else index out of bounds
        ) {
          d.currentQuestionIndex += 1;
          d.currentQuestionId =
            payload.currentExam.questionsById[d.currentQuestionIndex];
        } else {
          d.examFinished = true;
        }
      });
    case SET_CURRENT_QUESTION_ID:
      return produce(state, (d) => {
        d.currentQuestionId = payload.newQuestionId;
        d.currentQuestionIndex = payload.newQuestionIndex
          ? payload.newQuestionIndex
          : null;
      });

    default:
      return state;
  }
}

// ================= Body Tables =====================

function questionBodyMultipleChoiceTable(
  state = initialQuestionBodyMultipleChoiceTable,
  { type, payload }
) {
  switch (type) {
    case SET_QUESTION_BODY_MULTIPLE_CHOICE_TABLE:
      return produce(state, (d) => {
        d = payload.newTable;
        return d;
      });
    default:
      return state;
  }
}

function questionBodyFreeTextTable(
  state = initialQuestionBodyFreeTextTable,
  { type, payload }
) {
  switch (type) {
    case SET_QUESTION_BODY_FREE_TEXT_TABLE:
      return produce(state, (d) => {
        d = payload.newTable;
        return d;
      });
    default:
      return state;
  }
}

function answerBodyFreeTextTable(
  state = initialAnswerBodyFreeTextTable,
  { type, payload }
) {
  switch (type) {
    case SET_ANSWER_BODY_FREE_TEXT_TABLE:
      return produce(state, (d) => {
        d = payload.newTable;
        return d;
      });
    case ANSWER_FREE_TEXT_QUESTION:
      return produce(state, (d) => {
        const answer = d.byId[payload.questionId];
        answer.answerText = payload.answer;
      });

    default:
      return state;
  }
}

function answerBodyMultipleChoiceTable(
  state = initialAnswerBodyMultipleChoiceTable,
  { type, payload }
) {
  switch (type) {
    case SET_ANSWER_BODY_MULTIPLE_CHOICE_TABLE:
      return produce(state, (d) => {
        d = payload.newTable;
        return d;
      });
    case ANSWER_MULTIPLE_CHOICE_QUESTION:
      return produce(state, (d) => {
        d.byId[payload.questionId].selectedAnswers = payload.selectedAnswers;
      });
    default:
      return state;
  }
}

// =================== Root Reducer =================

export const rootReducer = combineReducers({
  examTable,
  questionTable,
  answerTable,
  questionBodyMultipleChoiceTable,
  questionBodyFreeTextTable,
  answerBodyFreeTextTable,
  answerBodyMultipleChoiceTable,
  examState,
});

export default rootReducer;
