// this needs a table that will have all the metrics names and numbers
// the table can have two tables for each row
// import Metrics from "./metricsForSummary";
import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Summary.module.scss";
import { useStore } from "../context/Provider";
import { GetServerSideProps } from "next";
import creatingMetricsObject from "../pages/api/redismonitor";
import Metrics from "./Metrics";

export default function Summary() {
  const [metrics, setMetrics] = useState({});
  const { metricsStore }: any = useStore();

  useEffect(() => {
    async function fetchDataFromRedis() {
      let response = await fetch("http://localhost:3000//api/redis", {
        method: "GET",
      });
      response = await response.json();
      setMetrics(response);
      metricsStore.metricsDispatch("updateMetrics", response);
    }
    fetchDataFromRedis();
  }, []);

  // .then(data => { setCurrentMetrics(data) })

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

// export const getServerSidepProps: GetServerSideProps = async () => {
//   const response = await fetch('/api/redis', { method: 'GET' });
//   console.log(response);
//   return { props: { data: response } };
// };
