import React, { useState } from "react";
import { Grid, Button, Card } from "theme-ui";
import { castDraft } from "immer";

export default function MakeSidePanel({ tabNames, tabComponents }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div>
      <Grid columns={[1, 2, 2]} gap={3}>
        {tabNames.map((btnName, idx) => {
          return (
            <Button
              onClick={() => {
                setActiveTab(idx);
              }}
              variant={idx === activeTab ? "activeTab" : "mutedTab"}
            >
              {btnName.display}
            </Button>
          );
        })}
      </Grid>
      <Card variant="blueBorder">{tabComponents[activeTab]}</Card>
    </div>
  );
}
