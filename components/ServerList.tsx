import React, { useState } from 'react';
import Server from './Server';
import styles from '../styles/ServerList.module.scss';

export default function ServerList(props) {
  const [currentDivHover, changeDivHover] = useState(null);
  const { serverList } = props;

  interface server {
    name: string;
    IP: string;
    PORT: string;
  }

  const servers: server[] = serverList.map((elem, index) => (
    <Server
      key={index}
      name={elem.name}
      IP={elem.ip}
      PORT={elem.port}
      currentDivHover={currentDivHover}
      changeDivHover={changeDivHover}
    />
  ));
  return <div className={styles.serverList}>{servers}</div>;
}
