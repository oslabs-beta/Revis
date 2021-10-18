import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import PropTypes from 'prop-types';
import styles from '../../../styles/GraphContainer.module.scss';
import { MetricsProps } from '../../../context/interfaces';

function MultipleGraph({ metricName, metricValue }: MetricsProps) {
  return (
    <div>
      <h1>{metricName}</h1>
      <div className={styles.Graph}>
        <LineChart
          width={600}
          height={400}
          data={metricValue}
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        >
          <Line type="monotone" dataKey={metricName} stroke="#d33b51" />
          <XAxis stroke="#ce6030" dataKey="time" tick={{ fill: '#d8d8d4' }} />
          <YAxis stroke="#ce6030" tick={{ fill: '#d8d8d4' }} />
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
