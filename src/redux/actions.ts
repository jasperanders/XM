import {
  TAnswerFreeTextPayload,
  TUseTimerPayload,
  TAnswerMultipleChoicePayload,
  TSetCurrentQuestionId,
} from "../types/reduxTypes";
import HttpService from "../services/http";
import apiRoutes from "../services/apiRoutes";

export const ANSWER_FREE_TEXT_QUESTION = "ANSWER_FREE_TEXT_QUESTION";
export const ANSWER_MULTIPLE_CHOICE_QUESTION =
  "ANSWER_MULTIPLE_CHOICE_QUESTION";
export const SET_ANSWER_START_TIME = "SET_ANSWER_START_TIME";
export const SET_ANSWER_END_TIME = "SET_ANSWER_END_TIME";
export const NEXT_QUESTION = "NEXT_QUESTION";
export const PREVIOUS_QUESTION = "PREVIOUS_QUESTION";
export const SET_APP_TIMER = "SET_APP_TIMER";
export const COUNT_DOWN_APP_TIMER = "COUNT_DOWN_APP_TIMER";
export const SET_CURRENT_QUESTION_ID = "SET_CURRENT_QUESTION_ID";

export const SET_ANSWER_TABLE = "SET_ANSWER_TABLE";
export const SET_QUESTION_TABLE = "SET_QUESTION_TABLE";
export const SET_EXAM_TABLE = "SET_EXAM_TABLE";
export const SET_EXAM_STATE = "SET_EXAM_STATE";

export const SET_QUESTION_BODY_MULTIPLE_CHOICE_TABLE =
  "SET_QUESTION_BODY_MULTIPLE_CHOICE_TABLE";
export const SET_ANSWER_BODY_MULTIPLE_CHOICE_TABLE =
  "SET_ANSWER_BODY_MULTIPLE_CHOICE_TABLE";
export const SET_QUESTION_BODY_FREE_TEXT_TABLE =
  "SET_QUESTION_BODY_FREE_TEXT_TABLE";
export const SET_ANSWER_BODY_FREE_TEXT_TABLE =
  "SET_ANSWER_BODY_FREE_TEXT_TABLE";

export function answerFreeTextQuestion(payload: TAnswerFreeTextPayload) {
  try {
    HttpService.post(apiRoutes.FREE_TEXT_ANSWER, {
      content: {
        answerId: payload.answerId,
        questionId: payload.questionId,
        answerText: payload.answer,
      },
    });
  } catch {
    console.error("Could not post, check your connection.");
  } finally {
    return { type: ANSWER_FREE_TEXT_QUESTION, payload };
  }
}

export function answerMultipleChoiceQuestion(
  payload: TAnswerMultipleChoicePayload
) {
  try {
    HttpService.post(apiRoutes.MULTIPLE_CHOICE_ANSWER, {
      content: {
        answerId: payload.answerId,
        questionId: payload.questionId,
        answers: payload.selectedAnswers,
      },
    });
  } catch {
    console.error("Could not post, check your connection.");
  } finally {
    return { type: ANSWER_MULTIPLE_CHOICE_QUESTION, payload };
  }
}

export function setAnswerStartTime(payload: TUseTimerPayload) {
  try {
    HttpService.put(`${apiRoutes.START_ANSWER_TIMER}${payload.answerId}`, {});
  } catch {
    console.error("Could not post, check your connection.");
  } finally {
    return { type: SET_ANSWER_START_TIME, payload };
  }
}

export function setAnswerEndTime(payload: TUseTimerPayload) {
  try {
     HttpService.put(`${apiRoutes.END_ANSWER_TIMER}${payload.answerId}`, {});
  } catch {
    console.error("Could not post, check your connection.");
  } finally {
    return { type: SET_ANSWER_END_TIME, payload };
  }
}

export function nextQuestion(payload) {
  return { type: NEXT_QUESTION, payload };
}

export function previousQuestion(payload) {
  return { type: PREVIOUS_QUESTION, payload };
}

export function setCurrentQuestionId(payload: TSetCurrentQuestionId) {
  return { type: SET_CURRENT_QUESTION_ID, payload };
}

/**
 * Whole table actions
 */
export function setAnswerTable(payload) {
  return { type: SET_ANSWER_TABLE, payload };
}
export function setQuestionTable(payload) {
  return { type: SET_QUESTION_TABLE, payload };
}
export function setExamTable(payload) {
  return { type: SET_EXAM_TABLE, payload };
}
export function setExamState(payload) {
  return { type: SET_EXAM_STATE, payload };
}

export function setQuestionBodyFreeTextTable(payload) {
  return { type: SET_QUESTION_BODY_FREE_TEXT_TABLE, payload };
}
export function setQuestionBodyMultipleChoiceTable(payload) {
  return { type: SET_QUESTION_BODY_MULTIPLE_CHOICE_TABLE, payload };
}
export function setAnswerBodyFreeTextTable(payload) {
  return { type: SET_ANSWER_BODY_FREE_TEXT_TABLE, payload };
}
export function setAnswerBodyMultipleChoiceTable(payload) {
  return { type: SET_ANSWER_BODY_MULTIPLE_CHOICE_TABLE, payload };
}
