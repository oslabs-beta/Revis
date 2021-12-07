import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import styles from '../../../styles/GraphContainer.module.scss';
import useStore from '../../../context/hooks/useStore';
import { Context } from '../../../context/interfaces';
import {
  METRIC_UNSELECTED,
  NEW_METRIC_SELECTED,
} from '../../../context/constants/actionTypes';
import { cleanNames } from '../../../functions/globalFunctions';

function MetricsForGraph({ metricName }: { metricName: string }) {
  const { multipleGraphSelections }: Context = useStore();

  const changeMetric = () => {
    if (multipleGraphSelections.multipleGraphState[metricName]) {
      multipleGraphSelections.multipleGraphDispatch({
        type: METRIC_UNSELECTED,
        message: metricName,
      });
    } else {
      if (Object.keys(multipleGraphSelections.multipleGraphState).length > 3) {
        return;
      }
      multipleGraphSelections.multipleGraphDispatch({
        type: NEW_METRIC_SELECTED,
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
      {cleanNames(metricName)}
    </div>
  );
}

export default MetricsForGraph;

MetricsForGraph.propTypes = {
  metricName: PropTypes.string.isRequired,
};
