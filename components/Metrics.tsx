import React from "react";
import router from "next/router";
import styles from "../styles/Summary.module.scss";

export default function Metrics(props) {
  const { keys, values } = props;
  return (
    <div className={styles.metrics}>
      <h5>{keys}</h5>
      <button type="button" onClick={() => router.replace("/redisinfo")}>
        {values}
      </button>
    </div>
  );
}
