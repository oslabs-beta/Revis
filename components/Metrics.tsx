import React from 'react';
import propTypes from 'prop-types';
import router from 'next/router';
import { useStore } from '../context/Provider';
import styles from '../styles/Summary.module.scss';

interface MetricsProps {
  keys: string;
  values: string;
}

export default function Metrics(props) {
  const { keys, values }: MetricsProps = props;
  const { metricToGraph } = useStore();

  const cleanKeys = (string) => {
    const splitKeys = string.split('_');
    const updatedKeys = splitKeys.map((str) => {
      const firstLetter = str[0].toUpperCase();
      return firstLetter + str.slice(1);
    });
    return updatedKeys;
  };

  return (
    <div className={styles.metrics}>
      <h5>{cleanKeys(keys).join(' ')}</h5>
      <button
        type="button"
        onClick={() => {
          metricToGraph.selectedMetricDispatch({
            type: 'updateSelectedMetric',
            message: keys,
          });
          router.replace('/graphs');
        }}
      >
        {values}
      </button>
    </div>
  );
}

Metrics.propTypes = {
  keys: propTypes.oneOfType([
    propTypes.string,
    propTypes.arrayOf(propTypes.string),
  ]).isRequired,
  values: propTypes.oneOfType([
    propTypes.string,
    propTypes.arrayOf(propTypes.string),
  ]).isRequired,
};
