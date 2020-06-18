export interface TQuestion {
  questionId: string;
  questionTitle: string;
  questionText: string;
  answerType: "freeText";
  answerText: string;
  timeLimit: number;
  timeUsed: number;
  timeStart: number;
  timeEnd: number;
  timeExpired: boolean;
}

export interface TQuestionState {
  byId: { [id: string]: TQuestion };
  allIds: Array<string>;
}

export interface TSolution {
  id: number;
  title: string;
  questionText: string;
  answerType: "freeText" | "multipleChoice";
  answerText: string;
  timeLimit: number;
}

export interface TExam {
  id: number;
  name: string;
  questions: Array<String>;
  currentQuestion: number;
}

export interface TAnswerPayload {
  questionId: string;
  answerText: string;
}
