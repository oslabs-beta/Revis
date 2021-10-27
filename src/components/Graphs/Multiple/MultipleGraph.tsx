import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import PropTypes from 'prop-types';
import styles from '../../../styles/GraphContainer.module.scss';
import { MetricsProps } from '../../../context/interfaces';

function MultipleGraph({ metricName, metricValue }: MetricsProps) {
  const cleanNames = (string: string): string[] => {
    const splitNames: string[] = string.split('_');
    const capitilizeFirstLetter: string[] = splitNames.map((str) => {
      const firstLetter: string = str[0].toUpperCase();
      return firstLetter + str.slice(1) + ' ';
    });
    return capitilizeFirstLetter;
  };

  const graphWidth = () => window.innerWidth / 5;
  

  return (
    <div>
      <h1>{cleanNames(metricName)}</h1>
      <div className={styles.Graph}>
        <LineChart
          width={graphWidth()}
          height={300}
          data={metricValue}
          margin={{ top: 30, right: 20, bottom: 25, left: 20 }}
        >
          <Line type="monotone" dataKey={metricName} stroke="#e38d41e9" />
          <XAxis stroke="#e38d41e9" dataKey="time" tick={{ fill: '#d8d8d4' }} />
          <YAxis stroke="#e38d41e9" tick={{ fill: '#d8d8d4' }} />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
}
export default MultipleGraph;

MultipleGraph.propTypes = {
  metricName: PropTypes.string.isRequired,
  metricValue: PropTypes.string.isRequired,
};
