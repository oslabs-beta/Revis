import React, { useState } from "react";
import Link from "next/link";
import ServerAdd from "./ServerAdd";
import ServerList from "./ServerList";
import styles from "../styles/Sidebar.module.scss";

function Sidebar(props) {
  const [sideBarHidden, showOrHideSideBar] = useState(false);
  const [serverList, updateList] = useState([]);

  const addServer = (e) => {
    e.preventDefault();
    const name = document.querySelector("#name").value;
    const IP = document.querySelector("#IP").value;
    const PORT = document.querySelector("#PORT").value;

    if (name.length <= 4 && PORT.length >= 4 && IP.length >= 7)
      updateList(serverList.concat({ name, IP, PORT }));
  };

  return (
    <div className={styles.sideBarWrapper}>
      <ServerAdd addServer={addServer} />
      <ServerList serverList={serverList} />
    </div>
  );
}

export default Sidebar;
