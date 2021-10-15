import React, { ReactElement } from "react";
import { useStore } from "../../../context/Provider";
import Message from "./Message";
import styles from "../../../styles/GraphContainer.module.scss";
import MetricsForGraph from "./MetricsForGraph";

function LeftMenuOfGraph() {
  const {metricsStore, multipleGraphSelections} = useStore(); //missing typescript
  const metricsForCheckBoxes: ReactElement[] = [];

  Object.entries(metricsStore.metricState[0]).forEach((el) => {
    if (el[0] !== "time")
      metricsForCheckBoxes.push(<MetricsForGraph keys={el[0]} />);
  });
  return (
    <div className={styles.LeftMenu}>
      {metricsForCheckBoxes}
      {Object.keys(multipleGraphSelections.multipleGraphState).length > 3 ? (
        <Message />
      ) : (
        ""
      )}
    </div>
  );
}

export default LeftMenuOfGraph;
