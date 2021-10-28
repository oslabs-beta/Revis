import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/Dashboard.module.scss';

function NavBarDashboard(props) {
  const { changeCurrentRender } = props;
  return (
    <div className={styles.navBarDashboardWrapper}>
      <div className={styles.cubeAndShadowWrapper}>
        <FontAwesomeIcon id={styles.cube} icon={faCube} />
        <div id={styles.shadow}>..</div>
      </div>

      <h1 id={styles.logo}>REVIS</h1>
      <div className={styles.navBarDashboard}>
        <button type="button" id={styles.Summary} onClick={changeCurrentRender}>
          Summary
        </button>
        <button type="button" id={styles.History} onClick={changeCurrentRender}>
          History
        </button>
        <button
          type="button"
          id={styles.multiplegraphs}
          onClick={changeCurrentRender}
        >
          Multiple graphs
        </button>
      </div>
    </div>
  );
}

export default NavBarDashboard;
