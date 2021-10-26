import React from 'react';
import router from 'next/router';
import styles from '../../styles/LandingPage.module.scss';

function NavBarLandingPage() {
  return (
    <div className={styles.NavBar}>
      
      <button
        type='button'
        onClick={() =>
          window.open(
            'https://github.com/oslabs-beta/Revis/blob/main/README.md#revis'
          )
        }
      >
        Documentation
      </button>
      <button type='button' onClick={() => router.replace('/aboutus')}>
        About us
      </button>
      <button id={styles.download} type='button' onClick={() => router.replace('/download')}>
        Download
      </button>
    </div>
  );
}

export default NavBarLandingPage;
