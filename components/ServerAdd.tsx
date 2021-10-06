import React, { useEffect, useState } from "react";
import styles from "../styles/ServerAdd.module.scss";

function ServerAdd(props) {
  const { addServer } = props;

  const IP_REG_EX: string =
    "^((?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])[.]){3}(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$";
  const PORT_REG_EX: string = "[0-9]{4}";

  const validityCheck = (e) => {
    const currentElem: HTMLInputElement = e.target;
    if (currentElem.validity.valid) currentElem.nextSibling.innerHTML = "";
  };
  return (
    <div className={styles.serverAddWrapper}>
      <h1> Add Server </h1>
      <form onSubmit={addServer} noValidate>
        <div className={styles.inputWrapper}>
          <div className={styles.indivInputs}>
            <label>Name:</label>
            <input
              type="text"
              id="name"
              autoComplete="off"
              required
              onChange={validityCheck}
              minLength={4}
              placeholder="My Redis Server"
            ></input>
            <div className={styles.errorDiv}></div>
          </div>

          <div className={styles.indivInputs}>
            <label>IP:</label>
            <input
              type="text"
              id="IP"
              autoComplete="off"
              required
              onChange={validityCheck}
              pattern={IP_REG_EX}
              placeholder="192.56.23.45"
            ></input>
            <div className={styles.errorDiv}></div>
          </div>

          <div className={styles.indivInputs}>
            <label>Port:</label>
            <input
              type="text"
              id="PORT"
              autoComplete="off"
              required
              onChange={validityCheck}
              pattern={PORT_REG_EX}
              placeholder="4000"
            ></input>
            <div className={styles.errorDiv}></div>
          </div>
        </div>

        <input id={styles.addServerBtn} type="submit" value="Add Server" />

 
      </form>
    </div>
  );
}

export default ServerAdd;
