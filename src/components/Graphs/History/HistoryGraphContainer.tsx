import React, { ReactElement, useState } from 'react';
import GridLayout from 'react-grid-layout';
import { useStore } from '../../../context/Provider';
import GraphWithHistory from './GraphWithHistory';
import DatesMenu from './DatesMenu';
import styles from '../../../styles/HistoryGraphsContainer.module.scss';
import { Context } from '../../../context/interfaces';
import { Layouts } from '../../context/interfaces';
import UpdateInterval from '../../Globals/UpdateInterval';
import MetricsDropdown from './MetricsDropdown';


function HistoryGraphContainer() {
  const { datesSelected, metricsStore }: Context = useStore();
  const [currentMetric, setCurrentMetric] = useState('');
  const { datesSelectedState }: DatesSelectedContext = datesSelected;
  
  const arrayWithGraphs: ReactElement[] = [];
  const data = metricsStore.metricState;

  let message : boolean = false;

  function setCurrentMetricFunction(metric) {
    setCurrentMetric(metric);
  }

  const layouts: Layouts = { 0: [0, 0], 1: [10, 0], 2: [0, 10], 3: [10, 10] };
  let i = 0;
  if (currentMetric) {
    arrayWithGraphs.push(
      <div
        key={i}
        data-grid={{ x: layouts[i][0], y: layouts[i][0], w: 6, h: 1.2 }}
      >
        <GraphWithHistory metricValue={data} metricName={currentMetric} />
      </div>
    );
    i+=1;
    Object.entries(datesSelectedState).forEach(date => {
      arrayWithGraphs.push(
        <div
          key={i}
          data-grid={{ x: layouts[i][0], y: layouts[i][0], w: 6, h: 1.2 }}
        >
          <GraphWithHistory metricValue={datesSelectedState[date]} metricName={date} />
        </div>
    )
    i+=1;
  })
  }
  else message = true;;
  return (
    <div className={styles.HistoryGraphContainer}>
      <DatesMenu metric= {currentMetric}/>
      <div className={styles.GraphFlex}>
        <GridLayout rowHeight={300} width={800}>
          {arrayWithGraphs}
        </GridLayout>
      </div>
      {message?<h2> Please select a metric to continue. </h2>:''}
      <MetricsDropdown setCurrentMetricFunction={setCurrentMetricFunction} />
      <UpdateInterval />
    </div>
  );
}
export default HistoryGraphContainer;
