import React from "react";
import { freeTextFromName } from "../../../constants/formConstants";
import { Textarea, Button } from "theme-ui";

export default function FreeTexTFreeTextQuestion({
  register,
  handleSubmit,
  watch,
  errors,
  onSubmit,
  question,
}) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        rows={10}
        columns={20}
        onPaste={(e) => {
          e.preventDefault();
          return false;
        }}
        onCopy={(e) => {
          e.preventDefault();
          return false;
        }}
        name={freeTextFromName}
        defaultValue={question.storedAnswer}
        ref={register}
      />
      <Button type="submit">Save and Next Question</Button>
    </form>
  );
}
