import React, { ReactElement } from "react";
import GridLayout from "react-grid-layout";
import { useStore } from "../../../context/Provider";
import MultipleGraph from "./MultipleGraph";
import LeftMenuOfGraph from "./LeftMenuOfGraph";
import styles from "../../../styles/GraphContainer.module.scss";

function MultipleGraphContainer() {
  const { multipleGraphSelections, metricsStore } = useStore(); //missing typescript
  const arrayWithGraphs: ReactElement[] = [];

  const data = metricsStore.metricState;

  let i = 0;

  Object.keys(multipleGraphSelections.multipleGraphState).forEach((key) => {
    if (multipleGraphSelections.multipleGraphState[key]) {
      arrayWithGraphs.push(
        <div key={i} data-grid={{ x: 0, y: 0, w: 6, h: 1.2 }}>
          <MultipleGraph values={data} keys={key} />
        </div>
      );
    }
    i += 1;
  });

  return (
    <div className={styles.MultipleGraphContainer}>
      <div>
        <LeftMenuOfGraph />
      </div>
      <div className={styles.GraphFlex}>
        <GridLayout rowHeight={400} width={1200}>
          {arrayWithGraphs}
        </GridLayout>
      </div>
    </div>
  );
}
export default MultipleGraphContainer;
