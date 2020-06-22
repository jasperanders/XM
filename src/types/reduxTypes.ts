export interface TAnswerFreeTextPayload {
  questionId: string;
  answerText: string;
}

export interface TUseTimerPayload {
  questionId: string;
}

export interface TCountDownAppTimer {
  countDownBy: number;
}
