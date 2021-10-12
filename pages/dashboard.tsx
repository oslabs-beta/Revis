import React from 'react';
import Sidebar_Endpoint from '../components/Sidebar_Endpoint';
import Summary_Endpoint from '../components/Summary_Endpoint';
import Summary from '../components/Summary';
import styles from '../styles/Dashboard.module.scss';

export default function about() {
  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.sidebarWrapper}>
        <Sidebar_Endpoint />
      </div>
      <div className={styles.summaryWrapper}>
        <Summary_Endpoint />
      </div>
    </div>
  );
}
