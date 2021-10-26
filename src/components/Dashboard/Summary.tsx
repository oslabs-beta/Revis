import React, { ReactElement, useEffect, useState } from 'react';
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
  const [metricsForTable, updateTable] = useState([]);

  // const metricsForTable: ReactElement[] = [];

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

  // const displayName = {
  //   total_net_output_bytes: 'total net output (MB)',
  //   used_memory: 'used memory',
  //   connected_clients: 'connected clients',
  //   evicted_keys: 'evicted keys',
  //   keyspace_hits: 'keyspace hits',
  //   keyspace_misses: 'keyspace misses',
  //   total_net_input_bytes: 'total net input (MB)',
  //   uptime_in_seconds: 'uptime (Hours)',
  // };
  // Object.entries(metricState[latestDataLength]).forEach(
  //   (metric: [string, string]) => {
  //     if (metric[0] !== 'time')
  //       metricsForTable.push(
  //         <Metrics
  //           key={metric[0]}
  //           metricName={displayName[metric[0]]}
  //           metricValue={metric[1]}
  //         />
  //       );
  // const latestMetricData = metricState[latestDataLength];
  // Object.keys(customMetricState).forEach((metric: string) => {
  //   metricsForTable.push(
  //     <Metrics
  //       key={metric}
  //       metricName={metric}
  //       metricValue={latestMetricData[metric]}
  //     />
  //   );
  // });

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
