import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../../../context/interfaces';
import { useStore } from '../../../context/Provider';
import styles from '../../../styles/HistoryGraphsContainer.module.scss';
import Dates from './Dates';

function DatesMenu(props) {
  const { metric } = props;
  // datesbeingcompared
  const tempObjForTests = {
    'redis-16424.c289.us-west-1-2.ec2.cloud.redislabs.com': [
      'Oct 20 2021',
      'Oct 21 2021',
      'Oct 22 2021',
    ],
    'redis-18891.c9.us-east-1-4.ec2.cloud.redislabs.com': [
      'Oct 19 2021',
      'Oct 21 2021',
      'Oct 22 2021',
    ],
  };

  // body: DATE, METRIC, ENDPOINT

  const { currentServer, datesSelected, metricHistory }: Context = useStore();
  const { metricHistoryState } = metricHistory; // this is going to have the global state with dates
  const datesForCheckBoxes: ReactElement[] = [];
  console.log(currentServer);

  if (currentServer.selectedServer.endpoint) {
    // console.log(metricHistoryState)
    // metricHistoryState is what we will add here instead of the tempObj once it's working
    metricHistoryState[currentServer.selectedServer.endpoint].forEach((el) => {
      datesForCheckBoxes.push(<Dates date={el} metric={metric} />);
    });
  }

  return <div className={styles.DatesMenu}>{datesForCheckBoxes}</div>;
}

export default DatesMenu;
DatesMenu.propTypes = {
  metric: PropTypes.string.isRequired,
};
