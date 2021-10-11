import React from 'react';
import Server_Endpoint from './Server_Endpoint';
import styles from '../styles/ServerList.module.scss';
import PropTypes from 'prop-types';

export default function ServerList(props) {
  const { serverList, removeServer, currentDivHover, changeDivHover } = props;

  interface server {
    name: string;
    endpoint: string;
    PORT: string;
  }

  const servers: server[] = serverList.map((elem, index) => (
    <Server_Endpoint
      key={index}
      name={elem.name}
      endpoint={elem.endpoint}
      PORT={elem.PORT}
      removeServer={removeServer}
      currentDivHover={currentDivHover}
      changeDivHover={changeDivHover}
    />
  ));
  return <div className={styles.serverList}>{servers}</div>;
}

ServerList.propTypes = {
  serverList: PropTypes.array.isRequired,
  removeServer: PropTypes.func.isRequired,
  currentDivHover: PropTypes.any,
  changeDivHover: PropTypes.func,
};