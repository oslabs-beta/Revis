import React from "react";
import styles from "../styles/Server.module.scss";
import { useStore } from "../context/Provider";

export default function Server(props) {
  const { name, IP, PORT, currentDivHover, changeDivHover } = props;

  const { servers }: any = useStore();
  const { serversDispatch }: { serversDispatch: Function } = servers;
  const removeServer = (e: Event) => {
    serversDispatch({
      type: "deleteServer",
      message: { name: e.target.id },
    });
  };
  const removeServerAnimation = (e) => {
    const wrapperName: HTMLDivElement = e.target.attributes[1].value;
    const removeServerDiv: HTMLDivElement = document.querySelector(
      `#${wrapperName}`
    );
    changeDivHover(removeServerDiv);
    removeServerDiv.style.width = "100%";
    removeServerDiv.style.backgroundColor = "red";
    removeServerDiv.innerHTML = "X";
  };

  const keepServerAnimation = (e) => {
    if (currentDivHover) {
      currentDivHover.style.width = "0%";
      currentDivHover.style.backgroundColor = "white";
      currentDivHover.innerHTML = "";
    }
  };

  return (
    <div className={styles.serverWrapper}>
      <div
        className={styles.removeServerWrapper}
        onMouseEnter={removeServerAnimation}
        onMouseLeave={keepServerAnimation}
        onClick={removeServer}
        name={name}
      >
        <div className={styles.removeServerDiv} id={name}></div>
      </div>
      <div className={styles.server}>
        <p>Name: {name}</p>
        <p>IP: {IP}</p>
        <p>Port: {PORT}</p>
      </div>
    </div>
  );
}
