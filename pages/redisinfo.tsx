import React from "react";
import MultipleGraphContainer from "../components/MultipleGraphContainer";
import BackButton from "../components/BackButton";
import Welcome from "../components/Welcome";

function redisInfo() {
  return (
    <div>
      <BackButton />
      <Welcome />
      <MultipleGraphContainer />
    </div>
  );
}
export default redisInfo;
