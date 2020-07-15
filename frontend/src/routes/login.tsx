import React, { useState, useContext } from "react";
import { Input, Button, Heading, Text } from "theme-ui";
import { useForm } from "react-hook-form";
import Layout from "../components/layout/Layout";
import HttpService from "../services/http";
import apiRoutes from "../services/apiRoutes";
import { UserContext } from "../services/userContext";

export default function Login() {
  const { loadUser } = useContext(UserContext);
  const { register, handleSubmit, reset } = useForm();
  const [formError, setFormError] = useState("");

  const onSubmit = (data) => {
    console.log(data);
    const { email, password } = data;
    HttpService.post(apiRoutes.AUTH, { email, password })
      .then(({ data }) => {
        HttpService.setAuthToken(data.token, true);
        loadUser();
      })
      .catch((error) => {
        setFormError(error);
      });
  };

  return (
    <Layout
      header={<Heading as="h1">XM</Heading>}
      mainContent={
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input ref={register} name={"email"} placeholder="Email" />
          <Input
            sx={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
            placeholder="Password"
            type="password"
            ref={register}
            name={"password"}
          />
          {formError && (
            <Text variant="warning">Something went wrong. Try again.</Text>
          )}
          <Button type={"submit"}>Login</Button>
        </form>
      }
    />
  );
}
