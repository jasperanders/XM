import { TQuestion, TQuestionState } from "../types/exam";

export const initialExam = {
  byId: {
    exam1: {
      id: "exam1",
      name: "Platform Economy",
      questionsById: ["question_01", "question_02"],
    },
  },
  allIds: ["exam1"],
};

export const initialQuestions: TQuestionState = {
  byId: {
    question_01: {
      questionId: "question_01",
      questionTitle: "",
      questionText: "What does the fox say?",
      answerType: "freeText",
      answerText: "",
      timeLimit: 120,
      timeUsed: null,
      timeStart: null,
      timeEnd: null,
      timeExpired: false,
    },
    question_02: {
      questionId: "question_02",
      questionTitle: "",
      questionText: "What does the bird say?",
      answerType: "freeText",
      answerText: "",
      timeLimit: 120,
      timeUsed: null,
      timeStart: null,
      timeEnd: null,
      timeExpired: false,
    },
  },
  allIds: ["question_01", "question_02"],
};

export const initialAppState = {
  currentQuestion: "question_01",
};
