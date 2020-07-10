import React, { useState } from "react";
import { Grid, Button, Card } from "theme-ui";
import { castDraft } from "immer";
import QuestionList from "./QuestionList";
import ExamList from "./ExamList";

export default function MakeSidePanel() {
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState(["questions", "exams"]);

  const makeTabContent = () => {
    switch (tabs[activeTab]) {
      case "questions":
        return <QuestionList />;
      case "exams":
        return <ExamList />;
      default:
        break;
    }
  };

  return (
    <div>
      <Grid columns={[1, 2, 2]} gap={3}>
        {tabs.map((btnName, idx) => {
          return (
            <Button
              onClick={() => {
                setActiveTab(idx);
              }}
              variant={idx === activeTab ? "activeTab" : "mutedTab"}
            >
              {btnName}
            </Button>
          );
        })}
      </Grid>
      <Card variant="blueBorder">{makeTabContent()}</Card>
    </div>
  );
}
