import React from "react";
import { useStore } from "../context/Provider";

function ServerListFromState() {
  const {servers} = useStore();
  const tryingSomething = [];
  function hello() {

    servers.serverList.serverList.forEach(el => {
        tryingSomething.push(<h3>el</h3>)
        console.log(tryingSomething);
  })
  }
    return (
        <button onClick={()=> {

            console.log(servers)
        }}>HelloAgain</button>
    )
}

export default ServerListFromState;
