import React from 'react';
import styles from '../../styles/StaticPages.module.scss';
import Image from 'next/image';
import ios from './ios-apple-572947.png';
import windows from './windows_logo.png';
import router from 'next/router';

function Download() {
  return (
    <div className={styles.downloadWrapper}>
      <button id={styles.backButton} type= 'button' onClick={()=>router.replace('/')}>Back</button>
      <span id={styles.highlight}>Download </span>
      <h2>3.0.0 is the latest release. The current stable version is 3.0.0.</h2>
      <div className={styles.icons}>
        <span id={styles.iconSpan}>
      <Image
        src={ios}
        alt='Image not available'
        height='50vh'
        width='50vh'
      />
      <p>Mac OS</p>
      <button>Download</button>
      </span>
      <span id={styles.iconSpan}>
      <Image
        src={windows}
        alt='Image not available'
        height='50vh'
        width='50vh'
      />
      <p>Windows 8 and higher</p>
      <button>Download</button>
      </span>
      </div>
    </div>
  );
}
export default Download;
