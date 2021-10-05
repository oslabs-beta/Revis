import React, { useState } from 'react';
import styles from '../styles/ServerAdd.module.scss';

function ServerAdd(props) {
  const { addServer } = props;
  return (
    <div className={styles.serverAddWrapper}>
      <h1> Add Server </h1>
      <form onSubmit={addServer}>
        <div className={styles.inputWrapper}>
          <label>Name:</label>
          <input type="text" id="name"></input>
          <br />

          <label>IP:</label>
          <input type="text" id="IP"></input>
          <br />
          <label>Port:</label>
          <input type="text" id="PORT"></input>
        </div>
        <input type="submit" value="Add Server" />
      </form>
    </div>
  );
}

export default ServerAdd;
