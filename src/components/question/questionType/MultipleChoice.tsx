import React from "react";
import { freeTextFromName } from "../../../constants/formConstants";
import { Textarea, Button } from "theme-ui";

export default function FreeTexTFreeTextQuestion({
  register,
  handleSubmit,
  watch,
  errors,
  onSubmit,
  storedAnswer,
}) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button type="submit">Save and Next Question</Button>
    </form>
  );
}
