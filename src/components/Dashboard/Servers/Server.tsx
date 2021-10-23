import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { useStore } from '../../../context/Provider';
import styles from '../../../styles/Server.module.scss';
import { Context } from '../../../context/interfaces';

export default function Server(props) {
  const { name, currentDivHover, changeDivHover } = props;

  const { servers, currentServer, metricsStore }: Context = useStore();
  const { selectedServerDispatch } = currentServer;
  const { serversDispatch } = servers;
  const { metricState,metricsDispatch } = metricsStore;

  const removeServer = (e) => {
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
          fetch('/api/validateUser', {
            method: 'POST',
            body: JSON.stringify({ endpoint: server.endpoint }),
            // headers: { 'Content-Type': 'application/json' },
          })
            .then((response) => response.json())
            .then((data) => {
              if ('password' in data) {
                selectedServerDispatch({
                  type: 'currentServer',
                  message: {
                    name: server.name,
                    endpoint: server.endpoint,
                    port: server.port,
                    password: data.password,
                  },
                });
                console.log(metricState);
                metricsDispatch({
                  type: 'cleanMetrics',
                  message:{
                    total_net_output_bytes: '0',
                    used_memory: '0',
                    connected_clients: '0',
                    evicted_keys: '0',
                    keyspace_hits: '0',
                    keyspace_misses: '0',
                    total_net_input_bytes: '0',
                    uptime_in_seconds: '0',
                  },
                });
              }
            });
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

Server.propTypes = {
  name: PropTypes.string.isRequired,
  // currentDivHover: PropTypes.instanceOf(Element).isRequired,
  changeDivHover: PropTypes.func.isRequired,
};
