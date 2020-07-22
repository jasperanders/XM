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
} from "../types/examTypes";

// ============== Task 01 ===================
const question_01: TQuestion = {
  questionId: v4(),
  questionType: "freeText",
  timeLimitMs: 40000,
  title: "That is the Question",
  text: "What does the Fox say?",
};

const answer_01: TAnswer = {
  answerId: v4(),
  questionId: question_01.questionId,
  timeStart: null,
  timeEnd: null,
  timeExpired: false,
};

const question_01_body: TQuestionBodyFreeText = {
  questionBodyId: v4(),
  questionId: question_01.questionId,
};

const answer_01_body: TAnswerBodyFreeText = {
  answerId: question_01.questionId,
  questionId: question_01_body.questionId,
  answerText: "",
};

// ============== Task 02 ===================
const question_02: TQuestion = {
  questionId: v4(),
  questionType: "freeText",
  timeLimitMs: 50000,
  title: "Even better Question",
  text: "How many roads must a man walk down?",
};

const answer_02: TAnswer = {
  answerId: v4(),
  questionId: question_02.questionId,
  timeStart: null,
  timeEnd: null,
  timeExpired: false,
};

const question_02_body: TQuestionBodyFreeText = {
  questionBodyId: v4(),
  questionId: question_02.questionId,
};

const answer_02_body: TAnswerBodyFreeText = {
  questionId: question_02.questionId,
  answerId: answer_02.answerId,
  answerText: "",
};

// ============== Task 03 ===================

const question_03: TQuestion = {
  questionId: v4(),
  questionType: "multipleChoice",
  timeLimitMs: 60000,
  title: "Your choice",
  text: "Yes or No?",
};

const answer_03: TAnswer = {
  answerId: v4(),
  questionId: question_03.questionId,
  timeStart: null,
  timeEnd: null,
  timeExpired: false,
};

const question_03_body: TQuestionBodyMultipleChoice = {
  questionId: question_03.questionId,
  possibleAnswers: ["Yes", "No"],
};

const answer_03_body: TAnswerBodyMultipleChoice = {
  questionId: question_03.questionId,
  answerId: answer_03.answerId,
  selectedAnswers: [],
};

// =============== exam_01 ===========

const exam_01: TExam = {
  examId: v4(),
  name: "Platform Economy",
  questionsById: [
    question_03.questionId,
    question_01.questionId,
    question_02.questionId,
  ],
};

// =============== tables ================

export const initialQuestionTable: TQuestionTable = {
  byId: {},
  allIds: [],
};

export const initialAnswerTable: TAnswerTable = {
  byId: {},
  allIds: [],
};

export const initialExamTable: TExamTable = {
  byId: {},
  allIds: [],
};

// ================ Body Table ===================
export const initialQuestionBodyFreeTextTable: TQuestionBodyFreeTextTable = {
  byId: {},
  allIds: [],
};

export const initialQuestionBodyMultipleChoiceTable: TQuestionBodyMultipleChoiceTable = {
  byId: {},
  allIds: [],
};

export const initialAnswerBodyFreeTextTable: TAnswerBodyFreeTextTable = {
  byId: {},
  allIds: [],
};

export const initialAnswerBodyMultipleChoiceTable: TAnswerBodyMultipleChoiceTable = {
  byId: {},
  allIds: [],
};

// =============== Exam State ====================

export const initialExamState: TExamState = {
  currentExamId: null,
  currentQuestionIndex: null,
  // currentQuestionId: null,
  currentQuestionId: null,
  currentTime: null,
  timerIsActive: true,
  examFinished: false,
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
