//this needs a table that will have all the metrics names and numbers
//the table can have two tables for each row
// import Metrics from "./metricsForSummary";
import styles from '../styles/Summary.module.scss';
import { useContext } from 'react';
import { GlobalContext } from '../context/Provider';

export default function Summary() {
  const globalC: any = useContext(GlobalContext);
  const metrics: any = globalC.metricState.metrics;

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

      <div className={styles.tableWrapper}>{metricsForTable}</div>
    </div>
  );
}
