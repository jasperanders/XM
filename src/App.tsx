import React from "react";
import { useSelector } from "react-redux";
import Question from "./components/question/Question";
import { setLocalStorage } from "./helper/localStorage";

function App() {
  const questions = useSelector((state: any) => state.questions);
  const currentQuestion = useSelector(
    (state: any) => state.appState.currentQuestion
  );

  return (
    <div className="App">
      <Question question={questions.byId[currentQuestion]} />;
    </div>
  );
}

export default App;
