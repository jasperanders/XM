import React from "react";
import Question from "./components/question/Question";
import { question } from "./objects/objects";

function App() {
  return (
    <div className="App">
      <Question question={question} />
    </div>
  );
}

export default App;
