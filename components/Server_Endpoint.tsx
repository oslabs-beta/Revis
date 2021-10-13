import styles from '../styles/Server.module.scss';
import PropTypes from 'prop-types';
import React from 'react';
import { useStore } from '../context/Provider';
export default function Server(props) {
  const {
    name,
    endpoint,
    PORT,
    currentDivHover,
    changeDivHover,
      } = props;
  const { servers, currentServer }: any = useStore();
  const { serversDispatch }: { serversDispatch: Function } = servers;
  const { selectedServerDispatch }: { selectedServerDispatch: Function } =
    currentServer;
  const removeServer = (e: Event) => {
    serversDispatch({
      type: 'deleteServer',
      message: { name: e.target.id },
    });
  };
  const removeServerAnimation = (e) => {
    const wrapperName: HTMLDivElement = e.target.attributes[1].value;
    const removeServerDiv: HTMLDivElement = document.querySelector(
      `#${wrapperName}`
    );
    changeDivHover(removeServerDiv);
    removeServerDiv.style.width = '100%';
    removeServerDiv.style.backgroundColor = 'red';
    removeServerDiv.innerHTML = 'X';
  };
  const keepServerAnimation = (e) => {
    if (currentDivHover) {
      currentDivHover.style.width = '0%';
      currentDivHover.style.backgroundColor = 'white';
      currentDivHover.innerHTML = '';
    }
  };
  const changeCurrentServer = (e) => {
    const currentServer: string = e.target.id;
    const currentPORT: any = e.target.value;
    if (
      currentServer === 'redis-16424.c289.us-west-1-2.ec2.cloud.redislabs.com'
    ) {
      selectedServerDispatch({
        type: 'currentServer',
        payload: {
          endpoint: currentServer,
          password: 'redis',
          port: 16424,
        },
      });
    } else {
      selectedServerDispatch({
        type: 'currentServer',
        payload: {
          endpoint: currentServer,
          password: 'Etttmq5T4ubqnE6TaYltcjXmdobQAjfq',
          port: 18891,
        },
      });
    }
  };
  return (
    <div className={styles.serverWrapper}>
      <div
        className={styles.removeServerWrapper}
        onMouseEnter={removeServerAnimation}
        onMouseLeave={keepServerAnimation}
        onClick={removeServer}
        name={name}
      >
        <div className={styles.removeServerDiv} id={name}></div>
      </div>
      <div className={styles.server}>
        <p>Name: {name}</p>
        <p>URL: {endpoint}</p>
        <p>Port: {PORT}</p>
      </div>
      <input
        id={endpoint}
        type='radio'
        name='currentServer'
        value={port}
        onChange={changeCurrentServer}
      />
    </div>
  );
}

Server.propTypes = {
  name: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
  PORT: PropTypes.string.isRequired,
  currentDivHover: PropTypes.any,
  changeDivHover: PropTypes.func,
};
