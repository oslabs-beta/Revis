import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from '../../styles/Dashboard.module.scss';

export default function MediaQuery() {
  const isTooSmall = useMediaQuery({ query: '(max-width: 800px)' });

  return (
    <div>
      <h1 className={styles.sidebarWrapper}>Device Test!</h1>
      {isTooSmall && <p>You are a desktop or laptop</p>}
    </div>
  );
}
