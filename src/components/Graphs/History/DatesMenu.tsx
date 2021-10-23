import React, { ReactElement } from 'react';
import { Context } from '../../../context/interfaces';
import { useStore } from '../../../context/Provider';
import styles from '../../../styles/HistoryGraphsContainer.module.scss';
import Dates from '../History/Dates';

function DatesMenu() {
  const tempObjForTests = {
    'redis-18891.c9.us-east-1-4.ec2.cloud.redislabs.com': [
      'Oct 20 2021',
      'Oct 21 2021',
      'Oct 22 2021',
    ],
    'redis-10027.c238.us-central1-2.gce.cloud.redislabs.com': [
      'Oct 19 2021',
      'Oct 21 2021',
      'Oct 22 2021',
    ],
  };
  const { currentServer,datesSelected  }: Context = useStore(); //this is going to have the global state with dates
  const datesForCheckBoxes: ReactElement[] = [];

  tempObjForTests['redis-10027.c238.us-central1-2.gce.cloud.redislabs.com'].forEach((el) => {
      datesForCheckBoxes.push(<Dates date={el} />);
  });

  return <div className={styles.DatesMenu}>{datesForCheckBoxes}</div>;
}

export default DatesMenu;
