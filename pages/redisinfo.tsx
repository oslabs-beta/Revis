import React from "react";
import BackButton from "../components/BackButton";
import ServerListFromState from "../components/ServerListFromState";

function redisInfo() {
  return (
    <div>
      <BackButton />
      <ServerListFromState />
    </div>
  );
}
export default redisInfo;
