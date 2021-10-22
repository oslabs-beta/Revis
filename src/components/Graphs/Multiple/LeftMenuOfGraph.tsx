import React, { ReactElement } from "react";
import { Context } from "../../../context/interfaces";
import { useStore } from "../../../context/Provider";
import styles from "../../../styles/GraphContainer.module.scss";
import MetricsForGraph from "./MetricsForGraph";

function LeftMenuOfGraph() {
  const { metricsStore, multipleGraphSelections }: Context = useStore();
  const metricsForCheckBoxes: ReactElement[] = [];

  Object.entries(metricsStore.metricState[0]).forEach((el) => {
    if (el[0] !== "time")
      metricsForCheckBoxes.push(<MetricsForGraph metricName={el[0]} />);
  });
  return (
    <div className={styles.LeftMenu}>
      {Object.keys(multipleGraphSelections.multipleGraphState).length > 3 ? (
        <div className={styles.MaxGraphsMessage}>
          Only 4 graphs can be simultaneously displayed
        </div>
      ) : (
        ""
      )}

      {metricsForCheckBoxes}
    </div>
  );
}

export default LeftMenuOfGraph;
