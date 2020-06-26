export interface TFreeTextQuestion {
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

export interface TMultipleChoiceQuestion {
  questionId: string;
  questionTitle: string;
  questionText: string;
  answerType: "multipleChoice";
  possibleAnswers: string;
  answerSelection: Array<string>;
  timeLimit: number;
  timeUsed: number;
  timeStart: number;
  timeEnd: number;
  timeExpired: boolean;
}

export interface TQuestionState {
  byId: { [id: string]: TFreeTextQuestion | TMultipleChoiceQuestion };
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
  id: string;
  name: string;
  questionsById: Array<string>;
}

export interface TExamState {
  byId: { [id: string]: TExam };
  allIds: Array<string>;
  currentExam: {
    id: string;
    currentQuestionIndex: number;
  };
}

export interface TAppState {
  currentTime: number;
  timerIsActive: boolean;
}

export interface TRootState {
  exams: TExamState;
  questions: TQuestionState;
  appState: TAppState;
}
