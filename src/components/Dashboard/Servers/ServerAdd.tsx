import React from "react";
import PropTypes from "prop-types";
import styles from "../../../styles/ServerAdd.module.scss";

function ServerAdd(props) {
  const { addServer }: { addServer: Function } = props;
  const PORT_REG_EX: string = "[0-9]{4,5}";
  const NAME_REG_EX: string = "[a-zA-Z]{4,25}";

  const validityCheckOnChange = () => {
    const nameElement: HTMLInputElement = document.querySelector("#name");
    const portElement: HTMLInputElement = document.querySelector("#PORT");
    const endpointElement: HTMLInputElement =
      document.querySelector("#endpoint");

    if (
      !nameElement.validity.patternMismatch &&
      !nameElement.validity.valueMissing
    )
      nameElement.setCustomValidity("");

    if (
      !portElement.validity.patternMismatch &&
      !portElement.validity.valueMissing
    )
      portElement.setCustomValidity("");

    if (
      !endpointElement.validity.patternMismatch &&
      !endpointElement.validity.valueMissing
    )
      endpointElement.setCustomValidity("");
  };

  return (
    <div className={styles.serverAddWrapper}>
      <h1> Add Server </h1>
      <form>
        <div className={styles.inputWrapper}>
    
          <div className={styles.indivInputs}>
            <label>Name:</label>
            <input
              type="text"
              id="name"
              autoComplete="off"
              required
              onChange={validityCheckOnChange}
              pattern={NAME_REG_EX}
              placeholder="Server Name"
            ></input>
            <div className={styles.errorDiv}></div>
          </div>

          <div className={styles.indivInputs}>
            <label>Endpoint URL:</label>
            <input
              type="text"
              id="endpoint"
              autoComplete="off"
              required
              onChange={validityCheckOnChange}
              placeholder="my-redis-server.com"
            ></input>
            <div className={styles.errorDiv}></div>
          </div>

          <div className={styles.indivInputs}>
            <label>Password</label>
            <input
              type="password"
              id="redisPassword"
              autoComplete="off"
              placeholder="Password"
              required
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
              onChange={validityCheckOnChange}
              pattern={PORT_REG_EX}
              placeholder="4000"
            ></input>
            <div className={styles.errorDiv}></div>
          </div>
        </div>
        <input
          id={styles.addServerBtn}
          type="submit"
          value="Add Server"
          onClick={addServer}
        />

      </form>
    </div>
  );
}

ServerAdd.propTypes = {
  addServer: PropTypes.func.isRequired,
};

export default ServerAdd;
