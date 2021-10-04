import React, { useState } from 'react';
import Link from 'next/link';
import ServerAdd from './ServerAdd';
import styles from '../styles/Sidebar.module.scss';

function Sidebar(props) {
  const [sideBarHidden, showOrHideSideBar] = useState(false);
  return (
    <div className={styles.sideBarWrapper}>
      <ServerAdd />
    </div>
  );
}

export default Sidebar;
