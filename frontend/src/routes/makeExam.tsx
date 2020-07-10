import React from "react";
import Layout from "../components/layout/Layout";
import MakeSidePanel from "../components/side/makeSidePanel";

export default function Creation() {
  return <Layout sidePanel={<MakeSidePanel />} />;
}
