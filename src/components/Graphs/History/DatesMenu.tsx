import React, { ReactElement } from 'react';
import { Context } from '../../../context/interfaces';
import { useStore } from '../../../context/Provider';
import styles from '../../../styles/HistoryGraphsContainer.module.scss';
import Dates from './Dates';

function DatesMenu() {
  //datesbeingcompared
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

  //body: DATE, METRIC, ENDPOINT

  const { currentServer, datesSelected, metricHistoryState }: Context =
    useStore(); // this is going to have the global state with dates
  const datesForCheckBoxes: ReactElement[] = [];

  if (currentServer.selectedServer.endpoint) {
    tempObjForTests[currentServer.selectedServer.endpoint].forEach((el) => {
      datesForCheckBoxes.push(<Dates date={el} />);
    });
  }

  return <div className={styles.DatesMenu}>{datesForCheckBoxes}</div>;
}

export default DatesMenu;
