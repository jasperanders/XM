import {
  TAnswerFreeTextPayload,
  TUseTimerPayload,
  TAnswerMultipleChoicePayload,
} from "../types/reduxTypes";

export const ANSWER_FREE_TEXT_QUESTION = "ANSWER_FREE_TEXT_QUESTION";
export const ANSWER_MULTIPLE_CHOICE_QUESTION =
  "ANSWER_MULTIPLE_CHOICE_QUESTION";
export const SET_ANSWER_START_TIME = "SET_ANSWER_START_TIME";
export const SET_ANSWER_END_TIME = "SET_ANSWER_END_TIME";
export const NEXT_QUESTION = "NEXT_QUESTION";
export const PREVIOUS_QUESTION = "PREVIOUS_QUESTION";
export const SET_APP_TIMER = "SET_APP_TIMER";
export const COUNT_DOWN_APP_TIMER = "COUNT_DOWN_APP_TIMER";

export function answerFreeTextQuestion(payload: TAnswerFreeTextPayload) {
  return { type: ANSWER_FREE_TEXT_QUESTION, payload };
}

export function answerMultipleChoiceQuestion(
  payload: TAnswerMultipleChoicePayload
) {
  return { type: ANSWER_MULTIPLE_CHOICE_QUESTION, payload };
}

export function setAnswerStartTime(payload: TUseTimerPayload) {
  return { type: SET_ANSWER_START_TIME, payload };
}

export function setAnswerEndTime(payload: TUseTimerPayload) {
  return { type: SET_ANSWER_END_TIME, payload };
}

export function nextQuestion(payload) {
  return { type: NEXT_QUESTION, payload };
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
