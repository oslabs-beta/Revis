import React from 'react';
import Image from 'next/image';
import saddog from './saddog.jpg';
import styles from '../styles/LandingPage.module.scss';

function Four04() {
  return (
    <div className={styles.invalidPage}>
      <h1>404 error</h1>
      <h2>Oh no! Page not found</h2>
      <Image
        src={saddog}
        alt="Page failed loading puppy"
        height="400px"
        width="400px"
      />
    </div>
  );
}

export default Four04;
