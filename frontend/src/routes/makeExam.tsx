import React from "react";
import Layout from "../components/layout/Layout";
import MakeSidePanel from "../components/side/makeSidePanel";
import Make from "../components/make";

export default function Creation() {
  return <Layout sidePanel={<MakeSidePanel />} mainContent={<Make />} />;
}
