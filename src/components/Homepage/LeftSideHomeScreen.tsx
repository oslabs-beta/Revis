import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube } from '@fortawesome/free-solid-svg-icons';
import router from 'next/router';
import styles from '../../styles/LeftSide.module.scss';

function LogoHomeScreen() {
  function stopCubeBounce() {
    document
      .querySelector(`.${styles.cube}`)
      .classList.toggle(`.${styles.stop}`);
    document
      .querySelector(`.${styles.shadow}`)
      .classList.toggle(`.${styles.stop}`);
  }
  return (
    <div className={styles.leftSideWrapper}>
      <button
        id={styles.backButton}
        type="button"
        onClick={() => router.replace('/')}
      >
        Back
      </button>
      <div className={styles.cubeAndShadowWrapper}>
        <button id={styles.cubeBox} onClick={stopCubeBounce} type="button">
          <FontAwesomeIcon className={styles.cube} icon={faCube} />
        </button>
        <div className={styles.shadow}>..</div>
      </div>

      <h1 id={styles.logo}>REVIS</h1>
    </div>
  );
}

export default LogoHomeScreen;
