import React, { ReactElement, useEffect } from 'react';
import styles from '../../styles/Summary.module.scss';
import { useStore } from '../../context/Provider';
import Metrics from './Metrics';
import Welcome from '../Globals/Welcome';
import SummaryTable from './SummaryTable';
import { Context } from '../../context/interfaces';

export default function Summary() {
  const { currentServer, servers, metricsStore, customMetrics }: Context = useStore();
  const { customMetricState } = customMetrics;
  const { serverList } = servers;
  const { selectedServer } = currentServer;
  const { endpoint, password, port } = selectedServer;
  const { metricState, metricsDispatch } = metricsStore;

  // const postMetricsToSQL = () =>{

  // }

  useEffect(() => {
    if (endpoint === '' || password === '' || port === '') return;
    async function fetchDataFromRedis() {
      const response = await fetch('/api/redis', {
        method: 'POST',
        body: JSON.stringify({
          endpoint: `${endpoint}`,
          password: `${password}`,
          port: `${port}`,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const updatedMetrics: string[] = await response.json();
      metricsDispatch({
        type: 'updateMetrics',
        message: updatedMetrics,
      });
    }
    if (selectedServer.name !== undefined) {
      fetchDataFromRedis();
    }
  }, [selectedServer]);

  const metricsForTable: ReactElement[] = [];
  const latestDataLength = metricState.length - 1;
  const latestMetricData = metricState[latestDataLength];
  Object.keys(customMetricState).forEach(
    (metric: string) => {
      metricsForTable.push(
        <Metrics
          key={metric}
          metricName={metric}
          metricValue={latestMetricData[metric]}
        />
      );
    }
  );

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
    </div>
  );
}
