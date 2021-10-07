//this needs a table that will have all the metrics names and numbers
//the table can have two tables for each row
// import Metrics from "./metricsForSummary";
import { useContext, useEffect, useState } from 'react';
import styles from '../styles/Summary.module.scss';
import { useStore } from '../context/Provider';


export default function Summary() {
  // const [metricsUpdated, setMetricsUpdated] : [any,any]= useState(false);
  const [currentMetrics, setCurrentMetrics] : [any, any] = useState({});

  let metricTest : any = useStore();
  metricTest = metricTest.metrics;

  const metrics = metricTest.metricState;


    fetch('/api/redis', { method: 'GET' })
    .then((data) => data.json())
    .then(data => { setCurrentMetrics(data) })
    // .then(() => setMetricsUpdated(true))


  // useEffect(()=>{
  //   metricTest.metricsDispatch({type:'updateMetrics', message:currentMetrics})
  // },metricsUpdated)

  const metricsForTable = [];
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

      {/* <div className={styles.tableWrapper}>{metricsForTable}</div> */}
    </div>
  );
}
