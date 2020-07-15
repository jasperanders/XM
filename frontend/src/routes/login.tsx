import React from "react";
import { Input, Button, Heading } from "theme-ui";
import { useForm } from "react-hook-form";
import Layout from "../components/layout/Layout";
import HttpService from "../services/http";
import apiRoutes from "../services/apiRoutes";

export default function Login() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const { email, password } = data;
    HttpService.post(apiRoutes.AUTH, { email, password }).then((res) =>
      console.log(res)
    );
  };

  return (
    <Layout
      header={<Heading as="h1">XM</Heading>}
      mainContent={
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input ref={register} name={"email"} placeholder="Email" />
          <Input
            sx={{ marginTop: "0.5rem" }}
            placeholder="Password"
            ref={register}
            name={"password"}
          />
          <Button type={"submit"}>Login</Button>
        </form>
      }
    />
  );
}
