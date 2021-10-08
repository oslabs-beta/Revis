import React from "react";
import { useStore } from "../context/Provider";

function Welcome() {
  const { user } = useStore();

  return <h4>Welcome {user.userState.username}!</h4>;
}
export default Welcome;
