import React, { useState } from "react";
import { Grid, Button, Card } from "theme-ui";
import { castDraft } from "immer";
import QuestionList from "./QuestionList";
import ExamList from "./ExamList";
import Tabs from "../../basics/Tab";

export default function MakeSidePanel() {
  return (
    <div>
      <Tabs
        tabNames={[
          { name: "question", display: "Questions" },
          { display: "Exams", name: "question" },
        ]}
        tabComponents={[<QuestionList />, <ExamList />]}
      />
    </div>
  );
}
