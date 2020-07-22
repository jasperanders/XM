// ================= Questions =========================

export interface TQuestion {
  questionId: string;
  questionType: "freeText" | "multipleChoice";
  text: string;
  timeLimitMs: number;
  title: string;
}

export interface TQuestionBodyFreeText {
  questionBodyId: string;
  questionId: string;
}

export interface TQuestionBodyMultipleChoice {
  questionId: string;
  possibleAnswers: Array<string>;
}

// ================ Answers ===========================

export interface TAnswer {
  questionId: string;
  answerId: string;
  timeStart: number;
  timeEnd: number;
  timeExpired: boolean;
}

export interface TAnswerBodyFreeText {
  questionId: string;
  answerId: string;
  answerText: string;
}

export interface TAnswerBodyMultipleChoice {
  questionId: string;
  answerId: string;
  selectedAnswers: Array<string>;
}

// ================ Exams =============================

export interface TExam {
  examId: string;
  name: string;
  questionsById: Array<string>;
}

// =============== Tables ==================

export interface TExamTable {
  byId: {
    [examId: string]: TExam;
  };
  allIds: Array<string>;
}

export interface TQuestionTable {
  byId: {
    [questionId: string]: TQuestion;
  };
  allIds: Array<string>;
}

export interface TAnswerTable {
  byId: {
    [questionId: string]: TAnswer;
  };
  allIds: Array<string>;
}

// ============= Body Tables ==================

export interface TQuestionBodyFreeTextTable {
  byId: {
    [questionId: string]: TQuestionBodyFreeText;
  };
  allIds: Array<string>;
}

export interface TQuestionBodyMultipleChoiceTable {
  byId: {
    [questionId: string]: TQuestionBodyMultipleChoice;
  };
  allIds: Array<string>;
}

export interface TAnswerBodyFreeTextTable {
  byId: {
    [questionId: string]: TAnswerBodyFreeText;
  };
  allIds: Array<string>;
}

export interface TAnswerBodyMultipleChoiceTable {
  byId: {
    [questionId: string]: TAnswerBodyMultipleChoice;
  };
  allIds: Array<string>;
}

// =============== Exam State ====================

export interface TExamState {
  currentExamId: string | null;
  currentQuestionIndex: number | null;
  currentQuestionId: string | null;
  currentTime: number | null;
  timerIsActive: boolean | null;
  examFinished: boolean;
}

// ============== Root State =======================

export interface TRootState {
  examTable: TExamTable;
  questionTable: TQuestionTable;
  answerTable: TAnswerTable;
  questionBodyMultipleChoiceTable: TQuestionBodyMultipleChoiceTable;
  questionBodyFreeTextTable: TQuestionBodyFreeTextTable;
  answerBodyFreeTextTable: TAnswerBodyFreeTextTable;
  answerBodyMultipleChoiceTable: TAnswerBodyMultipleChoiceTable;
  examState: TExamState;
}

//=============================================================
//=============================================================
//=============================================================

// export interface TFreeTextQuestion {
//   questionId: string;
//   questionTitle: string;
//   questionText: string;
//   answerType: "freeText";
// }

// export interface TFreeTextAnswer {
//   questionId: string;
//   answer: string;
// }

// export interface TMultipleChoiceQuestion {
//   questionId: string;
//   questionTitle: string;
//   questionText: string;
//   answerType: "multipleChoice";
//   possibleAnswers: Array<string>;
// }

// export interface TMultipleChoiceAnswer {
//   questionId: string;
//   selectedAnswer: Array<string>;
// }

// export interface TMetaInfoQuestion {
//   questionId: string;
//   timeLimit: number;
//   questionType: "freeTextQuestion" | "multipleChoiceQuestion";
// }

// export interface TMeatInfoAnswer {
//   timeUsed: number;
//   timeStart: number;
//   timeEnd: number;
//   timeExpired: boolean;
// }

// export interface TFreeTextQuestionState {
//   byId: { [id: string]: TFreeTextQuestion };
//   allIds: Array<string>;
// }

// export interface TMultipleChoiceQuestionState {
//   byId: { [id: string]: TMultipleChoiceQuestion };
//   allIds: Array<string>;
// }

// export interface TQuestionMetaInfoState {
//   byId: {
//     [id: string]: TQuestionMetaInfo;
//   };
//   allIds: Array<string>;
// }

// export interface TExam {
//   id: string;
//   name: string;
//   questionsById: Array<string>;
// }

// export interface TExamState {
//   byId: { [id: string]: TExam };
//   allIds: Array<string>;
//   currentExam: {
//     id: string;
//     currentQuestionIndex: number;
//   };
// }

// export interface TAppState {
//   currentTime: number;
//   timerIsActive: boolean;
// }

// export interface TRootState {
//   exams: TExamState;
//   questions: TFreeTextQuestionState;
//   appState: TAppState;
// }
