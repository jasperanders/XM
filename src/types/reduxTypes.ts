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
