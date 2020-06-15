export interface Question {
  id: number;
  title: string;
  questionText: string;
  body: {
    answerType: "freeText" | "multipleChoice";
    answer: string;
  };
  time: {
    limit: number;
    used: number | undefined;
    start: number | undefined;
    end: number | undefined;
    expired: boolean;
  };
}

export interface Solution {
  id: number;
  title: string;
  questionText: string;
  body: {
    answerType: "freeText" | "multipleChoice";
    answer: string;
  };
  time: {
    limit: number;
  };
}

export interface Exam {
  id: number;
  name: string;
  questions: Array<Question>;
  currentQuestion: number;
}

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
    used: undefined,
    start: undefined,
    end: undefined,
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
    start: undefined,
    used: undefined,
    end: undefined,
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

export const examDummy_01 = {
  id: 1,
  name: "Platform Ökonomie",
  questions: [question_01, question_01],
  currentQuestion: 0,
};

export const examDummy_02 = {
  id: 2,
  name: "Platform Ökonomie",
  questions: [question_02, question_01],
  currentQuestion: 0,
};
