import React from "react";
import { freeTextFromName } from "../../../constants/formConstants";
import { Textarea, Button } from "theme-ui";

export default function FreeTextQuestion({
  register,
  handleSubmit,
  watch,
  errors,
  onSubmit,
  storedAnswer,
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
        defaultValue={storedAnswer}
        ref={register}
      />
      <Button type="submit">Save and Next Question</Button>
    </form>
  );
}
