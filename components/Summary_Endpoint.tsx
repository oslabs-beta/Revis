// this needs a table that will have all the metrics names and numbers
// the table can have two tables for each row
// import Metrics from "./metricsForSummary";

import React, { useContext, useEffect, useState } from 'react';
import router from 'next/router';
import styles from '../styles/Summary.module.scss';
import { useStore } from '../context/Provider';
import Metrics from './Metrics';
import Welcome from './Welcome';
import Loading from './Loading';

export default function Summary() {
  const { metricsStore, currentServer }: any = useStore();
  const { selectedServer }: any = currentServer;

  const { endpoint, password, port } = selectedServer;
  useEffect(() => {
    async function fetchDataFromRedis() {
      let response = await fetch('http://localhost:3000/api/redis_Endpoint', {
        method: 'POST',
        body: JSON.stringify({
          endpoint: `${endpoint}`,
          password: `${password}`,
          port: `${port}`,
        }),
      });
      response = await response.json();
      await metricsStore.metricsDispatch({
        type: 'updateMetrics',
        message: response,
      });
    }

    if (selectedServer.length !== 0) {
      fetchDataFromRedis();
      const interal = setInterval(fetchDataFromRedis, 10000);
      return () => clearInterval(interal);
    }
  }, [selectedServer]);

  const metricsForTable = [];

  Object.entries(
    metricsStore.metricState[metricsStore.metricState.length - 1]
  ).forEach((el) => {
    if (el[0] !== 'time')
      metricsForTable.push(<Metrics key={el[0]} keys={el[0]} values={el[1]} />);
  });

  return (
    <div className={styles.SummaryWrapper}>
      <div className={styles.Welcome}>
        <Welcome />
      </div>
      <div>
        {metricsForTable.length === 0 ? (
          <div>
            <Loading />
          </div>
        ) : (
          <div>
            <h1> Summary </h1>
            <div className={styles.tableWrapper}>{metricsForTable}</div>
          </div>
        )}
      </div>
      <button type='button' onClick={() => router.replace('/redisinfo')}>
        Graphs
      </button>
    </div>
  );
}
