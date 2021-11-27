import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../../../context/interfaces';
import { useStore } from '../../../context/Provider';
import styles from '../../../styles/GraphContainer.module.scss';
import Dates from './Dates';

function DatesMenu(props) {
  const { metric } = props;

  const { currentServer, metricHistory }: Context = useStore();
  const { metricHistoryState } = metricHistory;
  const datesForCheckBoxes: ReactElement[] = [];

  if (
    metricHistoryState[currentServer.selectedServer.endpoint] &&
    currentServer.selectedServer.endpoint &&
    Object.keys(metricHistoryState).length !== 0
  ) {
    metricHistoryState[currentServer.selectedServer.endpoint].forEach(
      (el, index) => {
        datesForCheckBoxes.push(
          <Dates key={index} date={el} metric={metric} />
        );
      }
    );
  }

  return <div className={styles.DatesMenu}>{datesForCheckBoxes}</div>;
}

export default DatesMenu;
DatesMenu.propTypes = {
  metric: PropTypes.string.isRequired,
};
