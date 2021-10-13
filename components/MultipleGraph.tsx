import React, { useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { useStore } from "../context/Provider";
import styles from "../styles/GraphContainer.module.scss";

function MultipleGraph(props) {
  // const { metricsStore, metricToGraph }: any = useStore();
  const { keys, data } = props;

  return (
    <div>
      <h1>{keys}</h1>
      <div className={styles.Graph}>
        <LineChart
          width={600}
          height={400}
          data={data}
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        >
          <Line type="monotone" dataKey={keys} stroke="#d33b51" />
          {/* <Line type="monotone" dataKey="evicted_keys" stroke="#77EC7F" /> */}

          <XAxis stroke="#ce6030" dataKey="time" tick={{ fill: "#d8d8d4" }} />
          <YAxis stroke="#ce6030" tick={{ fill: "#d8d8d4" }} />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
}
export default MultipleGraph;

