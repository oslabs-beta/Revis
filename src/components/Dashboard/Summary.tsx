import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import styles from '../../styles/Summary.module.scss';
import { useStore } from '../../context/Provider';
import Metrics from './Metrics';

import SummaryTable from './SummaryTable';
import { Context } from '../../context/interfaces';

export default function Summary(props) {
  const { servers, metricsStore, customMetrics }: Context = useStore();
  const { customMetricState } = customMetrics;
  const { changeCurrentRender } = props;
  const { serverList } = servers;
  const { metricState } = metricsStore;
  const [metricsForTable, updateTable]: [
    ReactElement[],
    Dispatch<SetStateAction<ReactElement[]>>
  ] = useState([]);

  useEffect(() => {
    const tableMetrics = [];
    if (!metricState) return;
    if (metricState.length === 0) return;
    const latestDataLength = metricState.length - 1;
    const latestMetricData = metricState[latestDataLength];
    Object.keys(customMetricState).forEach((metric: string) => {
      tableMetrics.push(
        <Metrics
          key={metric}
          metricName={metric}
          metricValue={latestMetricData[metric]}
          changeCurrentRender={changeCurrentRender}
        />
      );
    });
    updateTable(tableMetrics);
  }, [metricState, customMetricState]);

  return (
    <div>
      <div className={styles.SummaryWrapper}>
        {serverList.length === 0 ? (
          <h1 >Add a server to view its metrics!</h1>
        ) : (
          <SummaryTable metricsForTable={metricsForTable} />
        )}
      </div>
    </div>
  );
}
