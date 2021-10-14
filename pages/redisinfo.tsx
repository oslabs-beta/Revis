import React from "react";
import MultipleGraphContainer from "../components/MultipleGraphContainer";
import BackButton from "../components/BackButton";
import Welcome from "../components/Welcome";
import UpdateInterval from '../components/UpdateInterval';

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
