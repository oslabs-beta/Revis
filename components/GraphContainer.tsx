import React from "react";
import Graph from "./Graph";
import BackButton from "./BackButton";
import styles from "../styles/GraphContainer.module.scss";

function GraphContainer() {
  return (
    <div className={styles.GraphContainer}>
      <div>
        <BackButton />
      </div>

      <Graph />
    </div>
  );
}
export default GraphContainer;
