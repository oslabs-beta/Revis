import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { useStore } from '../../../context/Provider';
import styles from '../../../styles/GraphContainer.module.scss';
import { Context } from '../../../context/interfaces';

function Graph() {
  const { metricsStore, metricToGraph }: Context = useStore();

  const data = metricsStore.metricState;
  const cleanNames = (string: string): string[] => {
    const splitNames: string[] = string.split('_');
    const capitilizeFirstLetter: string[] = splitNames.map((str) => {
      const firstLetter: string = str[0].toUpperCase();
      return firstLetter + str.slice(1) + ' ';
    });
    return capitilizeFirstLetter;
  };
  
  return (
    <div>
      {metricToGraph.metricToGraph?<h1>{cleanNames(metricToGraph.metricToGraph)}</h1>:''}
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
            stroke="#e38d41e9"
          />

          <XAxis stroke="#e38d41e9" dataKey="time" tick={{ fill: '#d8d8d4' }} />
          <YAxis stroke="#e38d41e9" tick={{ fill: '#d8d8d4' }} />

          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
}
export default Graph;
