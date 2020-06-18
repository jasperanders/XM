import { TAnswerPayload } from "../types/exam";

export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const START_TIMER = "START_TIMER";
export const END_TIMER = "END_TIMER";
export const NEXT_QUESTION = "NEXT_QUESTION";
export const PREVIOUS_QUESTION = "PREVIOUS_QUESTION";

export function answerQuestion(payload: TAnswerPayload) {
  return { type: ANSWER_QUESTION, payload };
}

export function startTimer(payload) {
  return { type: START_TIMER, payload };
}

export function endTimer(payload) {
  return { type: START_TIMER, payload };
}

export function nextQuestion(payload) {
  return { type: NEXT_QUESTION, payload };
}

export function previousQuestion(payload) {
  return { type: PREVIOUS_QUESTION, payload };
}
