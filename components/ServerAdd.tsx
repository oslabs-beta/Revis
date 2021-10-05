import React, { useEffect, useState } from 'react';
import styles from '../styles/ServerAdd.module.scss';
import isIp from 'is-ip';

function ServerAdd(props) {
  const { addServer } = props;

  const IP_REG_EX =
    '^((?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])[.]){3}(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$';
  const PORT_REG_EX = '[0-9]{4}';
  const validityCheck = (e) => {
    const currentElem: HTMLInputElement = e.target;
    if (!currentElem.validity.valid) {
      if (currentElem.id === 'name') {
        currentElem.nextSibling.innerHTML =
          'Please input at least four characters';
      } else if (currentElem.id === 'PORT') {
        currentElem.nextSibling.innerHTML =
          'Please input a proper port number (eg. 8080)';
      } else {
        currentElem.nextSibling.innerHTML =
          'Please input a proper IP number (eg. 192.45.23.64)';
      }
    } else currentElem.nextSibling.innerHTML = '';
  };
  return (
    <div className={styles.serverAddWrapper}>
      <h1> Add Server </h1>
      <form onSubmit={addServer} noValidate>
        <div className={styles.inputWrapper}>
          <label>Name:</label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            required
            onChange={validityCheck}
            minLength={4}
          ></input>
          <span></span>

          <br />

          <label>IP:</label>
          <input
            type="text"
            id="IP"
            autoComplete="off"
            required
            onChange={validityCheck}
            pattern={IP_REG_EX}
          ></input>
          <span></span>
          <br />
          <label>Port:</label>
          <input
            type="text"
            id="PORT"
            autoComplete="off"
            required
            onChange={validityCheck}
            pattern={PORT_REG_EX}
          ></input>
          <span></span>
        </div>
        <input type="submit" value="Add Server" />
      </form>
    </div>
  );
}

export default ServerAdd;
