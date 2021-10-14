// this needs a table that will have all the metrics names and numbers
// the table can have two tables for each row
// import Metrics from "./metricsForSummary";

import React, { useContext, useEffect, useState } from "react";
import router from "next/router";
import styles from "../styles/Summary.module.scss";
import { useStore } from "../context/Provider";
import Metrics from "./Metrics";
import Welcome from "./Welcome";
import Loading from "./Loading";

export default function Summary() {
  const [metrics, setMetrics] = useState({});
  const { currentServer }: any = useStore();
  const { selectedServer }: any = currentServer;
  const { endpoint, password, port } = selectedServer;
  // const { metrics }: any = useStore();
  // const {
  //   metricState,
  //   metricsDispatch,
  // }: { metricState: string[], metricsDispatch: Function } = metrics;

  useEffect(() => {
    async function fetchDataFromRedis() {
<<<<<<< HEAD:components/Summary_Endpoint.tsx
      let response = await fetch("http://localhost:3000/api/redis_Endpoint", {
        method: "POST",
        body: JSON.stringify({
          endpoint: `${endpoint}`,
          password: `${password}`,
          port: `${port}`,
        }),
=======
      let response = await fetch('http://localhost:3000/api/redis', {
        method: 'GET',
>>>>>>> dc574079b48d500cb156d205ee67283e7b694cb8:components/Archive/Summary.tsx
      });
      response = await response.json();
      // metricsDispatch({
      //   type: 'updateMetrics',
      //   message: [...response] ,
      // });
      // console.log(metricState)
      setMetrics(response);
    }
<<<<<<< HEAD:components/Summary_Endpoint.tsx

    if (selectedServer.endpoint) {
      fetchDataFromRedis();
      const interal = setInterval(fetchDataFromRedis, 10000);
      return () => clearInterval(interal);
=======
    if (selectedServer.length !== 0) {
      const interval = setInterval(fetchDataFromRedis, time);
      if (graphInterval.updateInterval.update === false)
        clearInterval(interval);
      return () => clearInterval(interval);
>>>>>>> dc574079b48d500cb156d205ee67283e7b694cb8:components/Archive/Summary.tsx
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
<<<<<<< HEAD:components/Archive/Summary.tsx
      <button type="button" onClick={() => router.replace('/redisinfo')}>
=======
      <button type="button" onClick={() => router.replace("/redisinfo")}>
>>>>>>> parent of 1b2dd8f (solving conflict with jason):components/Summary_Endpoint.tsx
        Graphs
      </button>
    </div>
  );
}