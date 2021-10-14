import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/Summary.module.scss';
import { useStore } from '../context/Provider';
import Metrics from './Metrics';
import Welcome from './Welcome';
import { CurrentServer } from '../context/Types';
import SummaryTable from './SummaryTable';

export default function Summary() {
  const [metrics, setMetrics] = useState({});
  const { currentServer, servers }: any = useStore();
  const { serverList }: { serverList: string[] } = servers;
  const { selectedServer } = currentServer;
  const { endpoint, password, port } = selectedServer;
  // const { metrics }: any = useStore();
  // const {
  //   metricState,
  //   metricsDispatch,
  // }: { metricState: string[], metricsDispatch: Function } = metrics;

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
      // metricsDispatch({
      //   type: 'updateMetrics',
      //   message: [...response] ,
      // });
      // console.log(metricState)
      setMetrics(response);
    }

    if (selectedServer.length !== 0) {
      const interal = setInterval(fetchDataFromRedis, 10000);
      return () => clearInterval(interal);
    }
  }, [selectedServer]);

  const metricsForTable = [];

  Object.entries(metrics).forEach((el) => {
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
