import React from "react";
import Question from "./components/question/Question";
import { question_01, examDummy_02 } from "./types/exam";
import { setLocalStorage } from "./helper/localStorage";

function App() {
  return (
    <div className="App">
      <Question question={question_01} />
      <button onClick={() => setLocalStorage("exam", examDummy_02)}>
        Click
      </button>
    </div>
  );
}

export default App;
