import React from "react";

export default function FreeTextQuestion({
  register,
  handleSubmit,
  watch,
  errors,
  onSubmit,
}) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea  name="answer" defaultValue="test" ref={register} />
      <input type="submit" />
    </form>
  );
}
