import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import styles from '../../../styles/GraphContainer.module.scss';
import { useStore } from '../../../context/Provider';
import { Context, DatesSelectedContext } from '../../../context/interfaces';

function MetricsForGraph({ date }: { date: string }) {
  const { datesSelected }: Context = useStore();
  const { datesSelectedState, datesSelectedDispatch }: DatesSelectedContext =
    datesSelected;

  const updateDates = () => {
    if (datesSelectedState[date]) {
      datesSelectedDispatch({
        type: 'newDateSelected',
        message: date,
      });
    } else {
      if (Object.keys(datesSelectedState).length > 2) {
        return;
      }
      datesSelectedDispatch({
        type: 'dateUnselected',
        message: date,
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
};
