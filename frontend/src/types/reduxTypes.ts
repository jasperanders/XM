import { TExam } from "./examTypes";

export interface TAnswerFreeTextPayload {
  questionId: string;
  answer: string;
}

export interface TAnswerMultipleChoicePayload {
  questionId: string;
  selectedAnswers: Array<string>;
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

export interface TSetCurrentQuestionId {
  newQuestionId: String;
  newQuestionIndex: number | null | undefined;
}
