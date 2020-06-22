import { TAnswerFreeTextPayload, TUseTimerPayload } from "../types/reduxTypes";

export const ANSWER_FREE_TEXT_QUESTION = "ANSWER_FREE_TEXT_QUESTION";
export const SET_QUESTION_START_TIME = "SET_QUESTION_START_TIME";
export const SET_QUESTION_END_TIME = "SET_QUESTION_END_TIME";
export const NEXT_QUESTION = "NEXT_QUESTION";
export const PREVIOUS_QUESTION = "PREVIOUS_QUESTION";
export const SET_APP_TIMER = "SET_APP_TIMER";
export const COUNT_DOWN_APP_TIMER = "COUNT_DOWN_APP_TIMER";

export function answerFreeTextQuestion(payload: TAnswerFreeTextPayload) {
  return { type: ANSWER_FREE_TEXT_QUESTION, payload };
}

export function setQuestionStartTime(payload: TUseTimerPayload) {
  return { type: SET_QUESTION_START_TIME, payload };
}

export function setQuestionEndTime(payload: TUseTimerPayload) {
  return { type: SET_QUESTION_END_TIME, payload };
}

export function nextQuestion() {
  return { type: NEXT_QUESTION };
}

export function previousQuestion(payload) {
  return { type: PREVIOUS_QUESTION, payload };
}

export function setAppTimer(payload) {
  return { type: SET_APP_TIMER, payload };
}

export function countDownAppTimer(payload) {
  return { type: COUNT_DOWN_APP_TIMER, payload };
}
