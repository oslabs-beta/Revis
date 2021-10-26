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
import Welcome from '../Globals/Welcome';
import SummaryTable from './SummaryTable';
import { Context } from '../../context/interfaces';
import UpdateInterval from '../Globals/UpdateInterval';

export default function Summary() {
  const { servers, metricsStore, customMetrics }: Context = useStore();
  const { customMetricState } = customMetrics;
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
        />
      );
    });
    updateTable(tableMetrics);
  }, [metricState, customMetricState]);

  return (
    <div className={styles.SummaryWrapper}>
      <div className={styles.Welcome}>
        <Welcome />
      </div>
      {serverList.length === 0 ? (
        <h1>Add a server to view its metrics!</h1>
      ) : (
        <SummaryTable metricsForTable={metricsForTable} />
      )}
      <UpdateInterval />
    </div>
  );
}
