import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/Dashboard.module.scss';

function NavBarDashboard(props) {
  const { viewLatency, viewMultipleGraphs, viewDashboard, history } = props;
  return (
    <div className={styles.navBarDashboardWrapper}>
      <div className={styles.cubeAndShadowWrapper}>
        <FontAwesomeIcon id={styles.cube} icon={faCube} />
        <div id={styles.shadow}>..</div>
      </div>

      <h1 id={styles.logo}>Revis</h1>
      <div className={styles.navBarDashboard}>
        <button type="button" onClick={viewLatency}>
          Latency
        </button>
        <button type="button" onClick={viewMultipleGraphs}>
          Multiple graphs
        </button>
        <button type="button" onClick={history}>
          History
        </button>
        <button type="button" onClick={viewDashboard}>
          Summary
        </button>
      </div>
    </div>
  );
}

export default NavBarDashboard;
