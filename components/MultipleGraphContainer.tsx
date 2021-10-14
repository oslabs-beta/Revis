import React, { useEffect, useState } from "react";
import { useStore } from "../context/Provider";
import GridLayout from "react-grid-layout";
import MultipleGraph from "./MultipleGraph";

import LeftMenuOfGraph from "./LeftMenuOfGraph";
import styles from "../styles/GraphContainer.module.scss";
//minW: 4, maxW: 8

function MultipleGraphContainer() {
  const { multipleGraphSelections, metricsStore } = useStore();
  const [layout, setLayout] = useState([
    { i: "0", x: 0, y: 0, w: 6, h: 1.2 },
    { i: "1", x: 5, y: 5, w: 6, h: 1.2 },
    { i: "2", x: 0, y: 0, w: 6, h: 1.2 },
    { i: "3", x: 5, y: 5, w: 6, h: 1.2 },
  ]);
  const arrayWithGraphs: [] = [];

  useEffect(() => {
    async function fetchDataFromRedis() {
      let response = await fetch("http://localhost:3000/api/redis", {
        method: "GET",
      });
      response = await response.json();

      await metricsStore.metricsDispatch({
        type: "updateMetrics",
        message: response,
      });
    }

    fetchDataFromRedis();

    const interval = setInterval(() => {
      fetchDataFromRedis();
      layoutFunction();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const data = metricsStore.metricState;

  async function layoutFunction() {
    await setLayout([
      { i: "0", x: 0, y: 0, w: 6, h: 1.2 },
      { i: "1", x: 5, y: 5, w: 6, h: 1.2 },
      { i: "2", x: 0, y: 0, w: 6, h: 1.2 },
      { i: "3", x: 5, y: 5, w: 6, h: 1.2 },
    ]);
  }

  let i = 0;
  for (const [key, value] of Object.entries(
    multipleGraphSelections.multipleGraphState
  )) {
    if (value) {
      arrayWithGraphs.push(
        <div key={i} data-grid={{ x: 0, y: 0, w: 6, h: 1.2 }}>
          <MultipleGraph data={data} keys={key} />
        </div>
      );

      i++;
    }
  }
  // layoutFunction();
  return (
    <div className={styles.MultipleGraphContainer}>
      <div>
        <LeftMenuOfGraph />
      </div>
      <div className={styles.GraphFlex}>
        <GridLayout
          // className="layout"
          // layout={layout}
          rowHeight={400}
          width={1200}
          // cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        >
          {arrayWithGraphs}
        </GridLayout>
      </div>
    </div>
  );
}
export default MultipleGraphContainer;
