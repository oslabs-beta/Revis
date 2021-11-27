import React from 'react';
import router from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/LandingPage.module.scss';
import NavBarLandingPage from './NavBarLandingPage';

function LandingPage() {
  function guestLogin() {
    fetch('/api/userLogin', {
      method: 'POST',
      body: JSON.stringify({ username: 'guest', password: 'password' }),
    }).then((response) => {
      if (response.status === 200) {
        router.replace('/dashboard');
      }
    });
  }
  function stopCubeBounce() {
    document
    .querySelector(`.${styles.cube}`)
    .classList.toggle(`${styles.stop}`);
    document
    .querySelector(`.${styles.shadow}`)
    .classList.toggle(`${styles.stop}`);
  }

  return (
    <div className={styles.LandingPageWrapper}>
      <NavBarLandingPage />
      <div className={styles.leftLandingPageWrapper}>
        <div className={styles.cubeAndShadow}>
          <button id={styles.cubeBox} onClick={stopCubeBounce} type='button'>
            <FontAwesomeIcon className={styles.cube} icon={faCube} />
          </button>
          <div className={styles.shadow}>..</div>
        </div>

        <h1 id={styles.logo}>REVIS</h1>
      </div>
      <div className={styles.rightLandingPageWrapper}>
        <h2>
          A dashboard to visualize your Redis metrics the way you deserve.
        </h2>
        <div className={styles.buttonDiv}>
          <button type='button' onClick={() => router.replace('/login')}>
            Start now
          </button>
          <button type='button' onClick={guestLogin}>
            Free demo
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
