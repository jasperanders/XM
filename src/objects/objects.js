export const question = {
  id: 12345,
  title: "",
  questionText: "What does the fox say?",
  body: {
    answerType: "freeText",
    answer: "",
  },
  time: {
    timeLimit: 120,
    usedTime: undefined,
  },
};

const solution = {
  id: 1234,
  title: "",
  questionText: "What does the fox say?",
  body: {
    answerType: "freeText",
    answer: "rigiding",
  },
  time: {
    timeLimit: 120,
  },
};

export const questions = [question, question];
