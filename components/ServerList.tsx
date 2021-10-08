import React from 'react';
import Server from './Server';
import styles from '../styles/ServerList.module.scss';

export default function ServerList(props) {
  const { serverList, removeServer, currentDivHover, changeDivHover } = props;

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
      removeServer={removeServer}
      currentDivHover={currentDivHover}
      changeDivHover={changeDivHover}
    />
  ));
  return <div className={styles.serverList}>{servers}</div>;
}
