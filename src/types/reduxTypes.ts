import { TExam } from "./exam";

export interface TAnswerFreeTextPayload {
  questionId: string;
  answer: string;
}

export interface TUseTimerPayload {
  questionId: string;
}

export interface TCountDownAppTimer {
  countDownBy: number;
}

export interface TNextQuestionPayload {
  currentExam: TExam;
}
