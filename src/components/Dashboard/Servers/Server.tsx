import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { useStore } from '../../../context/Provider';
import styles from '../../../styles/Server.module.scss';
import { Context } from '../../../context/interfaces';

export default function Server(props) {
  const { name, currentDivHover, changeDivHover } = props;

  const { user, servers, currentServer, metricsStore }: Context = useStore();
  const { selectedServerDispatch } = currentServer;
  const { serversDispatch } = servers;
  const { metricState, metricsDispatch } = metricsStore;
  const { userState } = user;

  const removeServer = (e) => {
    if (userState.username !== 'GuestUser' && e.target.name === 'Test') {
      serversDispatch({
        type: 'deleteServer',
        message: { name: e.target.id },
      });
    } else {
      const messageDiv = document.querySelector('#guestMessage');
      messageDiv.style.border = 'solid var(--grey)';
      messageDiv.innerHTML =
        'Test server cannot be deleted under the guest account.';
      setTimeout(() => {
        messageDiv.innerHTML = '';
        messageDiv.style.border = '';
      }, 3000);
    }
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
          })
            .then((response) => response.json())
            .then((data) => {
              if ('password' in data) {
                fetch('/api/retrieveMetrics')
                  .then((response) => response.json())
                  .then((metricData) => {
                    if (metricData.success) {
                      const { metricsUpdated } = metricData;

                      if (metricsUpdated.length === 0) return;
                      selectedServerDispatch({
                        type: 'currentServer',
                        message: {
                          name: server.name,
                          endpoint: server.endpoint,
                          port: server.port,
                          password: data.password,
                        },
                      });

                      metricsDispatch({
                        type: 'cleanMetrics',
                        message: {
                          metricsUpdated,
                        },
                      });
                    } else {
                      fetch('/api/redis', {
                        method: 'POST',
                        body: JSON.stringify({
                          endpoint: server.endpoint,
                          port: server.port,
                          password: data.password,
                        }),
                      })
                        .then((response) => response.json())
                        .then((metrics) => {
                          const { metricsUpdated } = metrics;
                          if (metricsUpdated.length === 0) return;
                          selectedServerDispatch({
                            type: 'currentServer',
                            message: {
                              name: server.name,
                              endpoint: server.endpoint,
                              port: server.port,
                              password: data.password,
                            },
                          });

                          metricsDispatch({
                            type: 'cleanMetrics',
                            message: {
                              metricsUpdated,
                            },
                          });
                        });
                    }
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
