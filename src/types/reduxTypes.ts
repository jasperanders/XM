import { TExam } from "./examTypes";

export interface TAnswerFreeTextPayload {
  questionId: string;
  answerId: string;
  answer: string;
}

export interface TAnswerMultipleChoicePayload {
  questionId: string;
  answerId: string;
  selectedAnswers: Array<string>;
}

export interface TUseTimerPayload {
  answerId: string;
  questionId: string;
}

export interface TNextQuestionPayload {
  currentExam: TExam;
}

export interface TSetCurrentQuestionId {
  newQuestionId: String;
  newQuestionIndex: number | null | undefined;
}
