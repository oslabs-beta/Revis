import React, { useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { useStore } from "../../../context/Provider";
import styles from "../../../styles/GraphContainer.module.scss";
import { GlobalContext } from "../../../context/interfaces";

function Graph() {
  const { metricsStore, metricToGraph } = useStore(); //missing TYpescript

  const data: string = metricsStore.metricState;

  return (
    <div>
      <h1>{metricToGraph.metricToGraph}</h1>
      <div className={styles.Graph}>
        <LineChart
          width={600}
          height={400}
          data={data}
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        >
          <Line
            type="monotone"
            dataKey={metricToGraph.metricToGraph}
            stroke="#d33b51"
          />

          <XAxis stroke="#ce6030" dataKey="time" tick={{ fill: "#d8d8d4" }}  />
          <YAxis stroke="#ce6030" tick={{ fill: "#d8d8d4" }} />
          <Tooltip />
        </LineChart> 
       </div>
    </div>
  );
}
export default Graph;
