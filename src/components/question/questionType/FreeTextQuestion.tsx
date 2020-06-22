import React from "react";

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
        name="answerText"
        defaultValue={storedAnswer}
        ref={register}
      />
      <input type="submit" />
    </form>
  );
}
