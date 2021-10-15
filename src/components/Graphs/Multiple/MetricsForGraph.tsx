import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import styles from '../../../styles/GraphContainer.module.scss';
import { useStore } from '../../../context/Provider';

function MetricsForGraph(props) {
  const { multipleGraphSelections } = useStore();
  const { keys } = props;

  const changeMetric = () => {
    if (multipleGraphSelections.multipleGraphState[keys]) {
      multipleGraphSelections.multipleGraphDispatch({
        type: 'metricUnselected',
        message: keys,
      });
    } else {
      if (Object.keys(multipleGraphSelections.multipleGraphState).length > 3) {
        return;
      }
      multipleGraphSelections.multipleGraphDispatch({
        type: 'newMetricSelected',
        message: keys,
      });
    }
  };

  const squareUnChecked = (
    <span onClick={changeMetric} key={keys}>
      <FontAwesomeIcon
        id={keys}
        icon={faSquare}
        className={styles.emptySquare}
      />
    </span>
  );
  const squareChecked = (
    <span onClick={changeMetric} key={keys}>
      <FontAwesomeIcon
        id={keys}
        icon={faCheckSquare}
        className={styles.fullSquare}
      />
    </span>
  );

  return (
    <div className={styles.metrics}>
      {multipleGraphSelections.multipleGraphState[keys]
        ? squareChecked
        : squareUnChecked}
      {keys}
    </div>
  );
}

export default MetricsForGraph;
