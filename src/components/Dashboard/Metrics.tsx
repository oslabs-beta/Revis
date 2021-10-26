import React, { ReactElement } from 'react';
import propTypes from 'prop-types';
import router from 'next/router';
import { useStore } from '../../context/Provider';
import styles from '../../styles/Summary.module.scss';
import { Context, MetricsProps } from '../../context/interfaces';
import Tooltip from './Tooltip';
import CustomMetricDropdown from './CustomMetricDropdown';

export default function Metrics(props: MetricsProps): ReactElement {
  const { metricName, metricValue }: MetricsProps = props;
  const { metricToGraph }: Context = useStore();

  const cleanNames = (string: string): string[] => {
    const splitNames: string[] = string.split('_');
    const capitilizeFirstLetter: string[] = splitNames.map((str) => {
      const firstLetter: string = str[0].toUpperCase();
      return firstLetter + str.slice(1) + ' ';
    });
    return capitilizeFirstLetter;
  };

  return (
    <div className={styles.metrics}>
      <div className={styles.metricsAndTooltip}>
        <CustomMetricDropdown metricName={cleanNames(metricName)} />
        {/* <h5>{cleanNames(metricName).join(' ')}</h5> */}
      </div>
      <Tooltip metric={metricName} />
      <button
        type='button'
        onClick={(): void => {
          metricToGraph.selectedMetricDispatch({
            type: 'updateSelectedMetric',
            message: metricName,
          });
          router.replace('/graphs');
        }}
      >
        {metricValue}
      </button>
    </div>
  );
}

Metrics.propTypes = {
  metricName: propTypes.oneOfType([
    propTypes.string,
    propTypes.arrayOf(propTypes.string),
  ]).isRequired,
  metricValue: propTypes.oneOfType([
    propTypes.string,
    propTypes.arrayOf(propTypes.string),
  ]).isRequired,
};
