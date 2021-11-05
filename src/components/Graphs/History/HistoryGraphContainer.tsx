import React, { ReactElement, useState } from 'react';

import { object } from 'prop-types';
import { useStore } from '../../../context/Provider';
import GraphWithHistory from './GraphWithHistory';
import DatesMenu from './DatesMenu';
import styles from '../../../styles/HistoryGraphsContainer.module.scss';
import { Context } from '../../../context/interfaces';
import UpdateInterval from '../../Globals/UpdateInterval';
import MetricsDropdown from './MetricsDropdown';
import Welcome from '../../Globals/Welcome';

function HistoryGraphContainer() {
  const { datesSelected, metricsStore }: Context = useStore();
  const [currentMetric, setCurrentMetric] = useState('');
  const { datesSelectedState }: DatesSelectedContext = datesSelected;

  const arrayWithGraphs: ReactElement[] = [];
  const data = metricsStore.metricState;

  let message: boolean = false;

  function setCurrentMetricFunction(metric) {
    setCurrentMetric(metric);
  }
  const today = new Date();

  let i = 0;
  if (currentMetric) {
    arrayWithGraphs.push(
      <div key={i}>
        <GraphWithHistory
          metricValue={data}
          metricName={currentMetric}
          date="Now"
        />
      </div>
    );
    i += 1;
    Object.keys(datesSelectedState).forEach((date) => {
      arrayWithGraphs.push(
        <div key={i}>
          <GraphWithHistory
            metricValue={datesSelectedState[date]}
            metricName={currentMetric}
            date={date}
          />
        </div>
      );
      i += 1;
    });
  } else message = true;
  return (
    <div className={styles.HistoryGraphContainer}>
      <DatesMenu metric={currentMetric} />
      <div className={styles.GraphFlex}>{arrayWithGraphs}</div>
      {message ? <h2> Please select a metric to continue. </h2> : ''}
      <MetricsDropdown setCurrentMetricFunction={setCurrentMetricFunction} />
    </div>
  );
}
export default HistoryGraphContainer;
