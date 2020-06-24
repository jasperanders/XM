import React from "react";
import { freeTextFromName } from "../../../constants/formConstants";

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
      <textarea
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
      <input type="submit" />
    </form>
  );
}
