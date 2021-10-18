import React from "react";
import MultipleGraphContainer from "../components/Graphs/Multiple/MultipleGraphContainer";
import BackButton from "../components/Globals/BackButton";
import Welcome from "../components/Globals/Welcome";
import UpdateInterval from "../components/Globals/UpdateInterval";

function redisInfo() {
  return (
    <div>
      <BackButton />
      <Welcome />
      <MultipleGraphContainer />
      <UpdateInterval />
    </div>
  );
}
export default redisInfo;
