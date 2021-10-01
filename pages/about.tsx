import { useContext } from "react";
import { GlobalContext } from "../context/Provider";

export default function about() {
  const testingState = useContext(GlobalContext);
  return (
    <div>
      <h1> About us </h1>
      <p>{testingState.userState.user.username}</p>
    </div>
  );
}
