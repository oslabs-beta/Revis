import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import useStore from '../../../context/hooks/useStore';
import styles from '../../../styles/Server.module.scss';
import { Context, ServerComponentProps } from '../../../context/interfaces';
import { onLoadFetch } from '../../../functions/globalFunctions';
import { DELETE_SERVER } from '../../../context/constants/actionTypes';

export default function Server(props: ServerComponentProps) {
  const { name, currentDivHover, changeDivHover } = props;
  const { user, servers, currentServer, metricsStore }: Context = useStore();
  const { selectedServerDispatch } = currentServer;
  const { serversDispatch } = servers;
  const { metricsDispatch } = metricsStore;
  const { userState } = user;

  const removeServer = (e: { target: HTMLDivElement }) => {
    if (
      userState.username === 'GuestUser' &&
      (e.target.name === 'Test' || e.target.id === 'Test')
    ) {
      const messageDiv: HTMLDivElement =
        document.querySelector('#guestMessage');
      messageDiv.style.border = 'solid var(--grey)';
      messageDiv.innerHTML =
        'Test server cannot be deleted under the guest account.';
      setTimeout(() => {
        messageDiv.innerHTML = '';
        messageDiv.style.border = '';
      }, 3000);
    } else {
      serversDispatch({
        type: DELETE_SERVER,
        message: { name: e.target.id },
      });
    }
  };

  const removeServerAnimation = (e: { target: HTMLDivElement }) => {
    const wrapperName: string = e.target.attributes[1].value;
    const removeServerDiv: HTMLDivElement = document.querySelector(
      `#${wrapperName}`
    );
    changeDivHover(removeServerDiv);
    removeServerDiv.style.width = '100%';
    removeServerDiv.style.backgroundColor = 'var(--red)';
    removeServerDiv.innerHTML = 'X';
  };
  const keepServerAnimation = () => {
    if (currentDivHover) {
      currentDivHover.style.width = '0%';
      currentDivHover.style.backgroundColor = 'white';
      currentDivHover.innerHTML = '';
    }
  };

  const updateSelectedServer = () => {
    if (!currentServer.selectedServer[name]) {
      // look for the information at the serverlist global state
      servers.serverList.forEach((server) => {
        if (server.name === name) {
          onLoadFetch(server, selectedServerDispatch, metricsDispatch, null);
        }
      });
    }
  };

  const squareUnChecked = (
    <span onClick={updateSelectedServer} id={styles.squareUnChecked} key={name}>
      <FontAwesomeIcon
        id={name}
        icon={faSquare}
        className={styles.emptySquare}
      />
    </span>
  );
  const squareChecked = (
    <span onClick={updateSelectedServer} id={styles.squareChecked} key={name}>
      <FontAwesomeIcon id={name} icon={faCheckSquare} />
    </span>
  );

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
        {currentServer.selectedServer.name === name
          ? squareChecked
          : squareUnChecked}

        <p>Name: {name}</p>
      </div>
    </div>
  );
}

Server.defaultProps = {
  currentDivHover: null,
};

Server.propTypes = {
  name: PropTypes.string.isRequired,
  currentDivHover: PropTypes.instanceOf(<div></div>),
  changeDivHover: PropTypes.func.isRequired,
};
