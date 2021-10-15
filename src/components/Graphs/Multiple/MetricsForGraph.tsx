import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faSquare } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import styles from "../../../styles/GraphContainer.module.scss";
import { useStore } from "../../../context/Provider";

function MetricsForGraph({ metricName }: { metricName: string }) {
  const { multipleGraphSelections } = useStore(); //missing TypeScript

  const changeMetric = () => {
    if (multipleGraphSelections.multipleGraphState[metricName]) {
      multipleGraphSelections.multipleGraphDispatch({
        type: "metricUnselected",
        message: metricName,
      });
    } else {
      if (Object.keys(multipleGraphSelections.multipleGraphState).length > 3) {
        return;
      }
      multipleGraphSelections.multipleGraphDispatch({
        type: "newMetricSelected",
        message: metricName,
      });
    }
  };

  const squareUnChecked = (
    <span onClick={changeMetric} key={metricName}>
      <FontAwesomeIcon
        id={metricName}
        icon={faSquare}
        className={styles.emptySquare}
      />
    </span>
  );
  const squareChecked = (
    <span onClick={changeMetric} key={metricName}>
      <FontAwesomeIcon
        id={metricName}
        icon={faCheckSquare}
        className={styles.fullSquare}
      />
    </span>
  );

  return (
    <div className={styles.metrics}>
      {multipleGraphSelections.multipleGraphState[metricName]
        ? squareChecked
        : squareUnChecked}
      {metricName}
    </div>
  );
}

export default MetricsForGraph;

MetricsForGraph.propTypes = {
  metricName: PropTypes.string.isRequired,
};
