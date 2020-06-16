import { Exam, Solution, Question } from "../types/exam";

const normalInitialState = {
  exams: {
    byId: {
      exam1: {
        id: "exam1",
        name: "Platform Economy",
        questionsById: ["question_01", "question_02"],
      },
    },
    allIds: ["exam1"],
  },
  questions: {
    byId: {
      question_01: {
        id: "question_01",
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
        id: "question_02",
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
  },
  appState: {
    currentQuestion: 0,
  }
};


export const question_01: Question = {
  id: 1,
  title: "",
  questionText: "What does the fox say?",
  body: {
    answerType: "freeText",
    answer: "",
  },
  time: {
    limit: 120,
    used: null,
    start: null,
    end: null,
    expired: false,
  },
};

const solution_01: Solution = {
  id: 1,
  title: "",
  questionText: "What does the fox say?",
  body: {
    answerType: "freeText",
    answer: "rigiding",
  },
  time: {
    limit: 120,
  },
};

export const question_02: Question = {
  id: 2,
  title: "",
  questionText: "What does the fox say?",
  body: {
    answerType: "freeText",
    answer: "",
  },
  time: {
    limit: 120,
    start: null,
    used: null,
    end: null,
    expired: false,
  },
};

const solution_02: Solution = {
  id: 2,
  title: "",
  questionText: "What does the fox say?",
  body: {
    answerType: "freeText",
    answer: "rigiding",
  },
  time: {
    limit: 120,
  },
};

export const examDummy_02 = {
  id: 2,
  name: "Platform Ökonomie",
  questions: [question_02, question_01],
  currentQuestion: 0,
};

export const initialState: Exam = {
  id: 1,
  name: "Platform Ökonomie",
  questions: [question_01, question_01],
  currentQuestion: 0,
};