// this needs a table that will have all the metrics names and numbers
// the table can have two tables for each row
// import Metrics from "./metricsForSummary";

import React, { useContext, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import styles from '../styles/Summary.module.scss';
import { useStore } from '../context/Provider';
import creatingMetricsObject from '../pages/api/redismonitor';
import Metrics from './Metrics';

export default function Summary() {
  const [metrics, setMetrics] = useState({});
  const { metricsStore }: any = useStore();

  useEffect(() => {
    // async function fetchDataFromRedis() {
    //   let response = await fetch('http://localhost:3000//api/redis', {
    //     method: 'GET',
    //   });
    //   response = await response.json();
    //   setMetrics(response);
    //   metricsStore.metricsDispatch('updateMetrics', response);
    // }
    // const constantFetch = setInterval(() => {
    //   fetchDataFromRedis();
    // }, []);
  });

  const metricsForTable = [];

  Object.entries(metrics).forEach((el) => {
    metricsForTable.push(<Metrics keys={el[0]} values={el[1]} />);
  });

  return (
    <div className={styles.SummaryWrapper}>
      <h1> Summary </h1>
      <div className={styles.tableWrapper}>{metricsForTable}</div>
    </div>
  );
}
