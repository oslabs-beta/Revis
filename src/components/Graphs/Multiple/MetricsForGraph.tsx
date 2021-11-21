import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import styles from '../../../styles/GraphContainer.module.scss';
import { useStore } from '../../../context/Provider';
import { Context } from '../../../context/interfaces';
import {
  METRIC_UNSELECTED,
  NEW_METRIC_SELECTED,
} from '../../../context/constants/actionTypes';

function MetricsForGraph({ metricName }: { metricName: string }) {
  const { multipleGraphSelections }: Context = useStore();
  const cleanNames = (string: string): string[] => {
    const splitNames: string[] = string.split('_');
    const capitilizeFirstLetter: string[] = splitNames.map((str) => {
      const firstLetter: string = str[0].toUpperCase();
      return `${firstLetter + str.slice(1)} `;
    });
    return capitilizeFirstLetter;
  };
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
