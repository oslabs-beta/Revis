import React, { ReactElement } from 'react';
import propTypes from 'prop-types';
import router from 'next/router';
import { useStore } from '../../context/Provider';
import styles from '../../styles/Summary.module.scss';
import { MetricsProps } from '../../context/interfaces';

export default function Metrics(props: MetricsProps):ReactElement {
  // keys is metric name, values is metric value
  const { keys, values }: MetricsProps = props;
  const { metricToGraph } = useStore();

  const cleanKeys = (string: string):string[] => {
    const splitKeys:string[] = string.split('_');
    const updatedKeys:string[] = splitKeys.map((str) => {
      const firstLetter:string = str[0].toUpperCase();
      return firstLetter + str.slice(1);
    });
    return updatedKeys;
  };

  return (
    <div className={styles.metrics}>
      <h5>{cleanKeys(keys).join(' ')}</h5>
      <button
        type="button"
        onClick={():void => {
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
