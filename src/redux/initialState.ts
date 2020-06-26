import { TQuestionState, TExamState } from "../types/exam";

export const initialExam: TExamState = {
  byId: {
    exam_01: {
      id: "exam_01",
      name: "Platform Economy",
      questionsById: ["question_01", "question_02"],
    },
  },
  allIds: ["exam_01"],
  currentExam: {
    id: "exam_01",
    currentQuestionIndex: 0,
  },
};

export const initialQuestions: TQuestionState = {
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
      questionTitle: "",
      questionText: "How many Roads must a man walk down?",
      answerType: "multipleChoice",
      possibleAnswers: "quest02",
      answerSelection: [],
      timeLimit: 51,
      timeUsed: null,
      timeStart: null,
      timeEnd: null,
      timeExpired: false,
    },
  },
  allIds: ["question_01", "question_02"],
};

export const initialAppState = {
  currentTime: null,
  timerIsActive: true,
};
