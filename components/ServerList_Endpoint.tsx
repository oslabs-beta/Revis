import React, { useState } from 'react';
import Server_Endpoint from './Server_Endpoint';
import styles from '../styles/ServerList.module.scss';
import PropTypes from 'prop-types';

export default function ServerList(props) {
  const [currentDivHover, changeDivHover] = useState(null);

  const { serverList } = props;

  interface server {
    name: string;
    endpoint: string;
    port: string | number;
  }

  const servers: server[] = serverList.map((elem, index) => (
    <Server_Endpoint
      key={index}
      name={elem.name}
      endpoint={elem.endpoint}
      PORT={elem.port}
      currentDivHover={currentDivHover}
      changeDivHover={changeDivHover}
    />
  ));
  return <div className={styles.serverList}>{servers}</div>;
}

ServerList.propTypes = {
  serverList: PropTypes.array.isRequired,
  currentDivHover: PropTypes.any,
  changeDivHover: PropTypes.func,
};
