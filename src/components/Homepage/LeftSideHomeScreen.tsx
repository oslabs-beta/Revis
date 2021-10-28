import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube } from '@fortawesome/free-solid-svg-icons';
import router from 'next/router';
import styles from '../../styles/LeftSide.module.scss';

function LogoHomeScreen() {
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
        <FontAwesomeIcon id={styles.cube} icon={faCube} />
        <div id={styles.shadow}>..</div>
      </div>

      <h1 id={styles.logo}>REVIS</h1>
    </div>
  );
}

export default LogoHomeScreen;
