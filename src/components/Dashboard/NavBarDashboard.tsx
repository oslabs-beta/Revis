import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/Dashboard.module.scss';

function NavBarDashboard(props) {
  const { changeCurrentRender } = props;
  function stopCubeBounce() {
    document
      .querySelector(`.${styles.cube}`)
      .classList.toggle(`.${styles.stop}`);
    document
      .querySelector(`.${styles.shadow}`)
      .classList.toggle(`.${styles.stop}`);
  }
  return (
    <div className={styles.navBarDashboardWrapper}>
      <div className={styles.cubeAndShadowWrapper}>
        <button id={styles.cubeBox} onClick={stopCubeBounce} type="button">
          <FontAwesomeIcon className={styles.cube} icon={faCube} />
        </button>
        <div className={styles.shadow}>..</div>
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
