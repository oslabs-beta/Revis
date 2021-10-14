import React from "react";
import GraphContainer from "../components/GraphContainer";
import Welcome from "../components/Welcome";
import BackButton from "../components/BackButton";

export default function graphs() {
  return (
    <div>
      <BackButton />
      <Welcome />
      <GraphContainer />
    </div>
  );
}
