import React, { useState } from "react";
import { useStore } from "../context/Provider";

import styles from "../styles/GraphContainer.module.scss";
import MetricsForGraph from "./MetricsForGraph";

function LeftMenuOfGraph() {
  const { metricsStore } = useStore();
  const metricsForCheckBoxes = [];
  // const [currentState,changeState] = useState([])

  Object.entries(metricsStore.metricState[0]).forEach((el) => {
    if (el[0] !== "time")
      metricsForCheckBoxes.push(<MetricsForGraph keys={el[0]} />);
  });
  return (
    <div className={styles.LeftMenu}>
      <li>Hello</li>
      {metricsForCheckBoxes}
    </div>
  );
}

export default LeftMenuOfGraph;
