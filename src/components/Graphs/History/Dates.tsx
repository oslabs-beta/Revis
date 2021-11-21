import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import styles from '../../../styles/GraphContainer.module.scss';
import { useStore } from '../../../context/Provider';
import { Context, DatesSelectedContext } from '../../../context/interfaces';
import {
  NEW_DATE_SELECTED,
  DATE_UNSELECTED,
} from '../../context/constants/actionTypes';

function MetricsForGraph({ date, metric }: { date: string; metric: string }) {
  const { datesSelected, currentServer }: Context = useStore();
  const { selectedServer } = currentServer;
  const { endpoint } = selectedServer;
  const { datesSelectedState, datesSelectedDispatch }: DatesSelectedContext =
    datesSelected;

  const updateDates = () => {
    if (!datesSelectedState[date] && metric) {
      fetch('api/retrieveMetrics', {
        method: 'POST',
        body: JSON.stringify({ endpoint, date, metric }),
      })
        .then((response: Response) => response.json())
        .then((data) => {
          datesSelectedDispatch({
            type: NEW_DATE_SELECTED,
            message: [date, data.arrayOfMetricObjects, metric],
          });
        });
    } else {
      datesSelectedDispatch({
        type: DATE_UNSELECTED,
        message: [date, [], ''],
      });
    }
  };

  const squareUnChecked = (
    <span onClick={updateDates} key={date}>
      <FontAwesomeIcon
        id={date}
        icon={faSquare}
        className={styles.emptySquare}
      />
    </span>
  );
  const squareChecked = (
    <span onClick={updateDates} key={date}>
      <FontAwesomeIcon
        id={date}
        icon={faCheckSquare}
        className={styles.fullSquare}
      />
    </span>
  );

  return (
    <div className={styles.dates}>
      {datesSelectedState[date] ? squareChecked : squareUnChecked}
      {date}
    </div>
  );
}

export default MetricsForGraph;

MetricsForGraph.propTypes = {
  date: PropTypes.string.isRequired,
  metric: PropTypes.string.isRequired,
};
