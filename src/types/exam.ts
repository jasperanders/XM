// ================= Questions =========================

export interface TQuestion {
  questionId: string;
  timeLimitMs: number;
  questionType: "freeText" | "multipleChoice";
  bodyId: string;
}

export interface TQuestionBodyFreeText {
  questionBodyId: string;
  // questionId: string;
  title: string;
  text: string;
}

export interface TQuestionBodyMultipleChoice {
  questionBodyId: string;
  // questionId: string;
  title: string;
  text: string;
  possibleAnswers: Array<string>;
}

// ================ Answers ===========================

export interface TAnswer {
  answerId: string;
  questionId: string;
  timeStart: number;
  timeEnd: number;
  timeExpired: boolean;
  bodyId: string;
}

export interface TAnswerBodyFreeText {
  answerBodyId: string;
  // answerId: string;
  answerText: string;
}

export interface TAnswerBodyMultipleChoice {
  answerBodyId: string;
  // answerId: string;
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
    [id: string]: TExam;
  };
  allIds: Array<string>;
}

export interface TQuestionTable {
  byId: {
    [id: string]: TQuestion;
  };
  allIds: Array<string>;
}

export interface TAnswerTable {
  byId: {
    [id: string]: TAnswer;
  };
  allIds: Array<string>;
}

// ============= Body Tables ==================

export interface TQuestionBodyFreeTextTable {
  byId: {
    [id: string]: TQuestionBodyFreeText;
  };
  allIds: Array<string>;
}

export interface TQuestionBodyMultipleChoiceTable {
  byId: {
    [id: string]: TQuestionBodyMultipleChoice;
  };
  allIds: Array<string>;
}

export interface TAnswerBodyFreeTextTable {
  byId: {
    [id: string]: TAnswerBodyFreeText;
  };
  allIds: Array<string>;
}

export interface TAnswerBodyMultipleChoiceTable {
  byId: {
    [id: string]: TAnswerBodyMultipleChoice;
  };
  allIds: Array<string>;
}

// =============== Exam State ====================

export interface TExamState {
  currentExamId: string;
  currentQuestionIndex: number;
  currentQuestionId: string;
  currentTime: number;
  timerIsActive: boolean;
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
