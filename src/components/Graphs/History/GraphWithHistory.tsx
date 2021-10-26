import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import PropTypes from 'prop-types';
import styles from '../../../styles/HistoryGraphsContainer.module.scss';
import { MetricsProps } from '../../../context/interfaces';

function GraphWithHistory({ metricName, metricValue }: MetricsProps) {
  return (
    <div>
      <h1>{metricName}</h1>
      <div className={styles.Graph}>
        <LineChart
          width={400}
          height={300}
          data={metricValue}
          margin={{ top: 30, right: 50, bottom: 25, left: 0 }}
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
export default GraphWithHistory;

GraphWithHistory.propTypes = {
  metricName: PropTypes.string.isRequired,
  metricValue: PropTypes.string.isRequired,
};
