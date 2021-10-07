//this needs a table that will have all the metrics names and numbers
//the table can have two tables for each row
// import Metrics from "./metricsForSummary";
import { useContext, useEffect, useState } from 'react';
import styles from '../styles/Summary.module.scss';
import { useStore } from '../context/Provider';
import { GetServerSideProps } from 'next';
import creatingMetricsObject from '../pages/api/redismonitor';

export default function Summary({ data }) {
  const [metrics, setMetrics] = useState({});
  // const [metricsUpdated, setMetricsUpdated] : [any,any]= useState(false);
  //const [currentMetrics, setCurrentMetrics] : [any, any] = useState({});

  //let metricTest : any = useStore();
  //metricTest = metricTest.metrics;
  useEffect(() => {
    async function fetchDataFromRedis() {
      let response = await fetch('http://localhost:3000//api/redis', {
        method: 'GET',
      });
      response = await response.json();
      setMetrics(response);
    }
    fetchDataFromRedis();
  }, []);

  // .then(data => { setCurrentMetrics(data) })
  console.log(metrics);
  const metricsForTable = [];
  console.log(metricsForTable)
  for (const key in metrics) {
    metricsForTable.push(
      <div className={styles.metrics}>
        <h5>{key}</h5>
        <button>{metrics[key]}</button>
      </div>
    );
  }

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
