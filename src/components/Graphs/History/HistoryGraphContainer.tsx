import React, { ReactElement, useState } from 'react';
import useStore from '../../../context/hooks/useStore';
import GraphWithHistory from '../Graph';
import DatesMenu from './DatesMenu';
import styles from '../../../styles/GraphContainer.module.scss';
import { Context } from '../../../context/interfaces';
import MetricsDropdown from './MetricsDropdown';

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

  let i = 0;
  if (currentMetric) {
    arrayWithGraphs.push(
      <div key={i}>
        <GraphWithHistory
          metricValue={data}
          metricName={currentMetric}
          title="Now"
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
            title={date}
          />
        </div>
      );
      i += 1;
    });
  } else message = true;
  return (
    <div className={styles.MultipleGraphContainer}>
      <DatesMenu metric={currentMetric} />
      <div className={styles.GraphFlex}>{arrayWithGraphs}</div>
      {message ? <h2> Please select a metric to continue. </h2> : ''}
      <MetricsDropdown setCurrentMetricFunction={setCurrentMetricFunction} />
    </div>
  );
}
export default HistoryGraphContainer;
