import React, { useContext, useState } from "react";
import { v4 } from "uuid";
import { useForm } from "react-hook-form";
import { Input, Badge, Heading, Flex, Select, Button } from "theme-ui";

import { ExamContext } from "../../../services/examContext";
import HttpService from "../../../services/http";
import apiRoutes from "../../../services/apiRoutes";

export default function Exam() {
  const { allQuestions, allUsers } = useContext(ExamContext);

  const [newExamState, setNewExamState] = useState({
    addedUsers: [],
    addedQuestions: [],
  });
  const { register, handleSubmit, reset, getValues } = useForm();

  const addUser = () => {
    const newUser = getValues().newUser;
    if (!newExamState.addedUsers.find((el) => newUser === el)) {
      setNewExamState((old) => ({
        ...old,
        addedUsers: [...old.addedUsers, newUser],
      }));
    }
  };
  const addQuestion = () => {
    const newQuestion = getValues().newQuestion;
    if (!newExamState.addedQuestions.find((el) => newQuestion === el)) {
      setNewExamState((old) => ({
        ...old,
        addedQuestions: [...old.addedQuestions, newQuestion],
      }));
    }
  };

  const onSubmit = (data) => {
    const { addedUsers, addedQuestions } = newExamState;
    const questionsById = [];
    const examUsers = [];
    addedQuestions.map((el) => {
      questionsById.push(JSON.parse(el).id);
    });
    addedUsers.map((el) => {
      examUsers.push(JSON.parse(el)._id);
    });
    HttpService.post(apiRoutes.EXAM, {
      content: {
        name: data.examTitle,
        questionsById: questionsById,
        examUsers: examUsers,
      },
    }).catch((err) => console.error(err));
  };

  return (
    <div>
      <Heading as="h2">Create New Exam</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          sx={{
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "stretch",
          }}
        >
          <Input
            sx={{ marginTop: "1rem" }}
            ref={register}
            name={"examTitle"}
            placeholder="Provide a Exam Title here"
            defaultValue={""}
          />

          <Flex
            sx={{
              flexDirection: "row",
            }}
          >
            {newExamState.addedUsers.map((el) => {
              const person = JSON.parse(el);
              return (
                <Badge sx={{ margin: "0.5rem" }} key={v4()}>
                  {person.name}
                </Badge>
              );
            })}
          </Flex>
          <Flex
            sx={{
              flexDirection: "row",
            }}
          >
            <Select sx={{ margin: "0.5rem" }} ref={register} name="newUser">
              {allUsers.rows.map((el) => {
                return (
                  <option key={v4()} value={JSON.stringify(el)}>
                    {el.name}
                  </option>
                );
              })}
            </Select>
            <Button type="button" sx={{ margin: "0.5rem" }} onClick={addUser}>
              +
            </Button>
          </Flex>
          <Flex
            sx={{
              flexDirection: "row",
            }}
          >
            {newExamState.addedQuestions.map((el) => {
              const question = JSON.parse(el);
              return (
                <Badge sx={{ margin: "0.5rem" }} key={v4()}>
                  {question.content.title}
                </Badge>
              );
            })}
          </Flex>
          <Flex
            sx={{
              flexDirection: "row",
            }}
          >
            <Select sx={{ margin: "0.5rem" }} ref={register} name="newQuestion">
              {allQuestions.map((el) => {
                return (
                  <option key={v4()} value={JSON.stringify(el)}>
                    {el.content.title}
                  </option>
                );
              })}
            </Select>
            <Button
              type="button"
              sx={{ margin: "0.5rem" }}
              onClick={addQuestion}
            >
              +
            </Button>
          </Flex>
        </Flex>
        <Button
          type="button"
          variant="warning"
          onClick={() => {
            setNewExamState({ addedUsers: [], addedQuestions: [] });
            reset();
          }}
        >
          reset
        </Button>
        <Button sx={{ marginLeft: "0.5rem" }} type="submit">
          Save
        </Button>
      </form>
    </div>
  );
}
