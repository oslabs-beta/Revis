import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/Summary.module.scss';
import { useStore } from '../context/Provider';
import Metrics from './Metrics';
import Welcome from './Welcome';
import { CurrentServer } from '../context/Types';
import SummaryTable from './SummaryTable';
import UpdateInterval from './UpdateInterval';

export default function Summary() {
  const { currentServer, graphInterval, servers, metricsStore }: any =
    useStore();
  const { serverList }: { serverList: string[] } = servers;

  const time = graphInterval.updateInterval.interval;
  const { selectedServer }: any = currentServer;
  const { endpoint, password, port } = selectedServer;
  const {
    metricState,
    metricsDispatch,
  }: { metricState: string[]; metricsDispatch: Function } = metricsStore;

  useEffect(() => {
    async function fetchDataFromRedis() {
      let response = await fetch('/api/redis', {
        method: 'POST',
        body: JSON.stringify({
          endpoint: `${endpoint}`,
          password: `${password}`,
          port: `${port}`,
        }),
      });
      response = await response.json();
      metricsDispatch({
        type: 'updateMetrics',
        message: response,
      });
    }
    if (selectedServer.length !== 0) {
      fetchDataFromRedis();
      const interval = setInterval(fetchDataFromRedis, time);
      if (graphInterval.updateInterval.update === false)
        clearInterval(interval);
      return () => clearInterval(interval);
    }
  });

  const metricsForTable = [];
  Object.entries(metricState[0]).forEach((el) => {
    metricsForTable.push(<Metrics key={el[0]} keys={el[0]} values={el[1]} />);
  });

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
