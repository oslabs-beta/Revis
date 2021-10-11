import React from "react";
import propTypes from "prop-types";
import router from "next/router";
import { useStore } from "../context/Provider";
import styles from "../styles/Summary.module.scss";

interface MetricsProps {
  keys: string;
  values: string;
}

export default function Metrics(props) {
  const { keys, values }: MetricsProps = props;
  const { metricToGraph } = useStore();

  return (
    <div className={styles.metrics}>
      <h5>{keys}</h5>
      <button
        type="button"
        onClick={() => {
          metricToGraph.selectedMetricDispatch({
            type: "updateSelectedMetric",
            message: keys,
          });
          router.replace("/redisinfo");
        }}
      >
        {values}
      </button>
    </div>
  );
}

Metrics.propTypes = {
  keys: propTypes.string.isRequired,
  values: propTypes.string.isRequired,
};
