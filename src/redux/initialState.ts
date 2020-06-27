import { v4 } from "uuid";
import {
  TQuestion,
  TQuestionBodyFreeText,
  TQuestionBodyMultipleChoice,
  TAnswerBodyFreeText,
  TAnswerBodyMultipleChoice,
  TAnswer,
  TExam,
  TQuestionTable,
  TExamTable,
  TAnswerTable,
  TExamState,
  TQuestionBodyMultipleChoiceTable,
  TQuestionBodyFreeTextTable,
  TAnswerBodyFreeTextTable,
  TAnswerBodyMultipleChoiceTable,
} from "../types/exam";

// ============== Task 01 ===================

const question_01_body: TQuestionBodyFreeText = {
  questionBodyId: v4(),
  title: "That is the Question",
  text: "What does the Fox say?",
};

const answer_01_body: TAnswerBodyFreeText = {
  answerBodyId: v4(),
  answerText: "",
};

const question_01: TQuestion = {
  questionId: v4(),
  questionType: "freeText",
  bodyId: question_01_body.questionBodyId,
  timeLimitMs: 5000,
};

const answer_01: TAnswer = {
  answerId: v4(),
  questionId: question_01.questionId,
  bodyId: answer_01_body.answerBodyId,
  timeStart: null,
  timeEnd: null,
  timeExpired: false,
};

// ============== Task 02 ===================

const question_02_body: TQuestionBodyFreeText = {
  questionBodyId: v4(),
  title: "Even better Question",
  text: "How many roads must a man walk down?",
};

const answer_02_body: TAnswerBodyFreeText = {
  answerBodyId: v4(),
  answerText: "",
};

const question_02: TQuestion = {
  questionId: v4(),
  questionType: "freeText",
  bodyId: question_02_body.questionBodyId,
  timeLimitMs: 5000,
};

const answer_02: TAnswer = {
  answerId: v4(),
  questionId: question_02.questionId,
  bodyId: answer_02_body.answerBodyId,
  timeStart: null,
  timeEnd: null,
  timeExpired: false,
};

// ============== Task 03 ===================

const question_03_body: TQuestionBodyMultipleChoice = {
  questionBodyId: v4(),
  title: "Your choice",
  text: "Yes or No?",
  possibleAnswers: ["Yes", "No"],
};

const answer_03_body: TAnswerBodyMultipleChoice = {
  answerBodyId: v4(),
  selectedAnswers: [],
};

const question_03: TQuestion = {
  questionId: v4(),
  questionType: "multipleChoice",
  bodyId: question_03_body.questionBodyId,
  timeLimitMs: 5000,
};

const answer_03: TAnswer = {
  answerId: v4(),
  questionId: question_03.questionId,
  bodyId: answer_03_body.answerBodyId,
  timeStart: null,
  timeEnd: null,
  timeExpired: false,
};

// =============== exam_01 ===========

const exam_01: TExam = {
  examId: v4(),
  name: "Platform Economy",
  questionsById: [
    question_01.questionId,
    question_02.questionId,
    question_03.questionId,
  ],
};

// =============== tables ================

export const initialQuestionTable: TQuestionTable = {
  byId: {
    [question_01.questionId]: question_01,
    [question_02.questionId]: question_02,
    [question_03.questionId]: question_03,
  },
  allIds: [
    question_01.questionId,
    question_02.questionId,
    question_03.questionId,
  ],
};

export const initialAnswerTable: TAnswerTable = {
  byId: {
    [answer_01.questionId]: answer_01,
    [answer_02.questionId]: answer_02,
    [answer_03.questionId]: answer_03,
  },
  allIds: [answer_01.answerId, answer_02.answerId, answer_03.answerId],
};

export const initialExamTable: TExamTable = {
  byId: {
    [exam_01.examId]: exam_01,
  },
  allIds: [exam_01.examId],
};

// ================ Body Table ===================
export const initialQuestionBodyFreeTextTable: TQuestionBodyFreeTextTable = {
  byId: {
    [question_01_body.questionBodyId]: question_01_body,
    [question_02_body.questionBodyId]: question_02_body,
  },
  allIds: [question_01_body.questionBodyId, question_02_body.questionBodyId],
};

export const initialQuestionBodyMultipleChoiceTable: TQuestionBodyMultipleChoiceTable = {
  byId: {
    [question_03_body.questionBodyId]: question_03_body,
  },
  allIds: [question_03_body.questionBodyId],
};

export const initialAnswerBodyFreeTextTable: TAnswerBodyFreeTextTable = {
  byId: {
    [answer_01_body.answerBodyId]: answer_01_body,
    [answer_02_body.answerBodyId]: answer_02_body,
  },
  allIds: [answer_03_body.answerBodyId],
};

export const initialAnswerBodyMultipleChoiceTable: TAnswerBodyMultipleChoiceTable = {
  byId: {
    [answer_03_body.answerBodyId]: answer_03_body,
  },
  allIds: [answer_01_body.answerBodyId, answer_02_body.answerBodyId],
};

// =============== Exam State ====================

export const initialExamState: TExamState = {
  currentExamId: exam_01.examId,
  currentQuestionIndex: 0,
  currentQuestionId: question_01.questionId,
  currentTime: null,
  timerIsActive: true,
};

// =========================================
// =========================================
/*
export const initialExam: TExamState = {
  byId: {
    exam_01: {
      id: "exam_01",
      name: "Platform Economy",
      questionsById: ["question_01", "question_03", "question_02"],
    },
  },
  allIds: ["exam_01"],
  currentExam: {
    id: "exam_01",
    currentQuestionIndex: 0,
  },
};

export const initialQuestions: TFreeTextQuestionState = {
  byId: {
    question_01: {
      questionId: "question_01",
      questionTitle: "General Question",
      questionText: "What does the fox say?",
      answerType: "freeText",
      answerText: "quest01",
      timeLimit: 20,
      timeUsed: null,
      timeStart: null,
      timeEnd: null,
      timeExpired: false,
    },
    question_02: {
      questionId: "question_02",
      questionTitle: "General Question",
      questionText: "How many roads must a man walk down?",
      answerType: "freeText",
      answerText: "quest02",
      timeLimit: 20,
      timeUsed: null,
      timeStart: null,
      timeEnd: null,
      timeExpired: false,
    },
  },
  allIds: ["question_01", "question_02"],
};

export const initialMultipleChoiceQuestions: TMultipleChoiceQuestionState = {
  byId: {
    question_03: {
      questionId: "question_03",
      questionTitle: "",
      questionText: "Ja, oder Nein",
      answerType: "multipleChoice",
      possibleAnswers: ["Ja", "Nein"],
      answerSelection: [],
      timeLimit: 51,
      timeUsed: null,
      timeStart: null,
      timeEnd: null,
      timeExpired: false,
    },
  },
  allIds: ["question_03"],
};

export const initialQuestionTypes: TQuestionTypes = {
  byId: {
    question_01: {
      questionId: "question_01",
      questionType: "freeTextQuestion",
    },
    question_02: {
      questionId: "question_02",
      questionType: "freeTextQuestion",
    },
    question_03: {
      questionId: "question_03",
      questionType: "multipleChoiceQuestion",
    },
  },
  allIds: ["question_01", "question_02", "question_03"],
};

export const initialAppState = {
  currentTime: null,
  timerIsActive: true,
};
*/
