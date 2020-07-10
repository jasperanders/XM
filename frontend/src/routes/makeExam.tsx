import React from "react";
import Layout from "../components/layout/Layout";
import MakeSidePanel from "../components/side/makeSidePanel";
import Make from "../components/make";
import { Heading } from "theme-ui";

export default function Creation() {
  return (
    <Layout
      header={<Heading as="h1">XM</Heading>}
      sidePanel={<MakeSidePanel />}
      mainContent={<Make />}
    />
  );
}
