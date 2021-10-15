import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { useStore } from '../../../context/Provider';
import styles from '../../../styles/GraphContainer.module.scss';

function Graph() {
  const { metricsStore, metricToGraph }: any = useStore();

  const data = metricsStore.metricState;

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
          {/* <Line type="monotone" dataKey="evicted_keys" stroke="#77EC7F" /> */}

          <XAxis stroke="#ce6030" dataKey="time" tick={{ fill: '#d8d8d4' }} />
          <YAxis stroke="#ce6030" tick={{ fill: '#d8d8d4' }} />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
}
export default Graph;

// console.log(metricsStore.metricState.metricsUpdated);
// const data = [
//   { name: "metric 1", metric1: 400, metric2: 10, metric3: 2400 },
//   { name: "metric 1", metric1: 300, metric2: 15, metric3: 2600 },
//   { name: "metric 1", metric1: 200, metric2: 20, metric3: 2600 },
//   { name: "metric 1", metric1: 100, metric2: 50, metric3: 2600 },
// ];
// <img src="https://i.pinimg.com/originals/2e/e6/99/2ee6998e34c3e2eff7b894c66cfc5267.jpg"></img>
