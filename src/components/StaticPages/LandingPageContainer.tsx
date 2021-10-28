import React from 'react';
import router from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/LandingPage.module.scss';
import NavBarLandingPage from './NavBarLandingPage';

function LandingPage() {
  return (
    <div className={styles.LandingPageWrapper}>
      <NavBarLandingPage />
      <div className={styles.leftLandingPageWrapper}>
        <div className={styles.cubeAndShadow}>
          <span id={styles.cubeSpan}>
            <FontAwesomeIcon id={styles.cube} icon={faCube} />
          </span>
          <div id={styles.shadow}>..</div>
        </div>

        <h1 id={styles.logo}>REVIS</h1>
      </div>
      <div className={styles.rightLandingPageWrapper}>
        <h2>
          A dashboard to visualize your Redis metrics the way you deserve.
        </h2>
        <div className={styles.buttonDiv}>
          <button type="button" onClick={() => router.replace('/login')}>
            Start now
          </button>
          <button type="button" onClick={() => router.replace('/dashboard')}>
            Free demo
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
