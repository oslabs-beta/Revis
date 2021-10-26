import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import router from 'next/router';
import { useStore } from '../../context/Provider';
import Sidebar from './Sidebar';
import Summary from './Summary';
import styles from '../../styles/Dashboard.module.scss';
import SignOutButton from '../Globals/SignOutButton';
import NavBarDashboard from './NavBarDashboard';
import { Context } from '../../context/interfaces';
import MultipleGraphContainer from '../Graphs/Multiple/MultipleGraphContainer';
import HistoryGraphsContainer from '../Graphs/History/HistoryGraphContainer';
import currentServer from '../../context/reducers/currentServer';

export default function Dashboard() {
  const { user, metricsStore, servers, currentServer, metricHistory }: Context =
    useStore();
  const { metricState, metricsDispatch } = metricsStore;
  const { serverList } = servers;
  const { selectedServerDispatch } = currentServer;

  const [currentRender, setCurrentRender] = useState('dashboard');
  const [noUsername, changeUsernameBool]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(true);
  const { userDispatch } = user;
  const { metricHistoryDispatch, metricHistoryState } = metricHistory;

  const reformatDataForDB = (metrics: Metrics[]) => {
    const reformattedData = {};
    metrics.forEach((metricData) => {
      Object.entries(metricData).forEach(([metricName, value]) => {
        if (!(metricName in reformattedData)) reformattedData[metricName] = [];
        reformattedData[metricName].push(`'${value}'`);
      });
    });
    return reformattedData;
  };
  const storeDataInPG = () => {
    if (metricState.length > 1) {
      fetch('/api/storeMetrics', {
        method: 'POST',
        body: JSON.stringify(reformatDataForDB(metricState)),
      });
    }
  };
  useEffect(() => {
    fetch('/api/validateUser')
      .then((response: Response) => response.json())
      .then((data) => {
        const { username, ssid }: { username: string; ssid: string } = data;
        if (!username || !ssid) return router.replace('/');
        userDispatch({ type: 'updateUsername', message: username });
        changeUsernameBool(false);
      })
      .catch((err) => console.log(err));

    if (serverList.length > 0) {
      const server = serverList[0];
      fetch('/api/validateUser', {
        method: 'POST',
        body: JSON.stringify({ endpoint: server.endpoint }),
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
            fetch('/api/redis', {
              method: 'POST',
              body: JSON.stringify({
                endpoint: server.endpoint,
                port: server.port,
                password: data.password,
              }),
            })
              .then((response) => response.json())
              .then((metricData) => {
                const {
                  uptime_in_seconds,
                  used_memory,
                  total_net_output_bytes,
                  total_net_input_bytes,
                  evicted_keys,
                  connected_clients,
                  keyspace_hits,
                  keyspace_misses,
                  time,
                } = metricData;
                metricsDispatch({
                  type: 'cleanMetrics',
                  message: {
                    uptime_in_seconds,
                    used_memory,
                    total_net_output_bytes,
                    total_net_input_bytes,
                    evicted_keys,
                    connected_clients,
                    keyspace_hits,
                    keyspace_misses,
                    time,
                  },
                });
              });
          }
        });
    }
    // then ping backend to store server history in Redis
    setInterval(storeDataInPG, 1000 * 60);

    fetch('/api/storeMetrics')
      .then((response: Response) => response.json())
      .then((data) => {
        // console.log(metricHistoryState);
        metricHistoryDispatch({
          type: 'addServer',
          message: data.serversAndDates,
        });
        // console.log(metricHistoryState);
      })
      .catch((err) => console.log(err));
  }, [serverList]);

  const changeCurrentRender = (e) => {
    setCurrentRender(e.target.innerHTML);
  };

  function renderSwitch(param: string) {
    switch (param) {
      case 'Latency':
        return 'latency';
      case 'History':
        return <HistoryGraphsContainer />;
      case 'Multiple graphs':
        return <MultipleGraphContainer />;
      default:
        return <Summary />;
    }
  }

  return (
    <div className={styles.dashboardWrapper}>
      {!noUsername && (
        <>
          <div className={styles.sidebarWrapper}>
            <NavBarDashboard changeCurrentRender={changeCurrentRender} />
            <SignOutButton />
            <Sidebar />
          </div>
          <div className={styles.summaryWrapper}>
            {renderSwitch(currentRender)}
          </div>
        </>
      )}
    </div>
  );
}
