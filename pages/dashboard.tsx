import React from 'react';
import Sidebar from '../components/Sidebar';
import Summary from '../components/Summary';
import styles from '../styles/Dashboard.module.scss';

export default function about() {
  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.sidebarWrapper}>
        <Sidebar />
      </div>
      <div className={styles.summaryWrapper}>
        <Summary />
      </div>
    </div>
  );
}
