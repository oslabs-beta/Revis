import React from 'react';
import PropTypes from 'prop-types';
import Server from './Server';
import styles from '../../../styles/ServerList.module.scss';
import { ServerInterface } from '../../../context/interfaces';

export default function ServerList(props) {
  const { serverList, currentDivHover, changeDivHover } = props;

  const servers: ServerInterface[] = serverList.map((elem, index) => (
    <Server
      key={index}
      name={elem.name}
      endpoint={elem.endpoint}
      port={elem.port}
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
  changeCurrentServer: PropTypes.func,
};
