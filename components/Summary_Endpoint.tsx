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
import UpdateInterval from './UpdateInterval';

export default function Summary() {
  const [metrics, setMetrics] = useState({});
  const { currentServer, graphInterval }: any = useStore();
  const time = graphInterval.updateInterval.interval;
  const { selectedServer }: any = currentServer;
  const { endpoint, password, port } = selectedServer;
  // const { metrics }: any = useStore();
  // const {
  //   metricState,
  //   metricsDispatch,
  // }: { metricState: string[], metricsDispatch: Function } = metrics;

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
      // metricsDispatch({
      //   type: 'updateMetrics',
      //   message: [...response] ,
      // });
      // console.log(metricState)
      setMetrics(response);
    }
    if (selectedServer.length !== 0) {
      const interval = setInterval(fetchDataFromRedis, time);
      if (graphInterval.updateInterval.update === false) clearInterval(interval);
      return () => clearInterval(interval);
    }
  });

  const metricsForTable = [];

  Object.entries(metrics).forEach((el) => {
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
      <UpdateInterval />
    </div>
  );
}
