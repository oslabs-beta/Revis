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

export default function Dashboard() {
  const { user, metricsStore, servers, currentServer }: Context = useStore();
  const { metricState, metricsDispatch } = metricsStore;
  const { serverList } = servers;
  const { selectedServerDispatch } = currentServer;

  const [currentRender, setCurrentRender] = useState('dashboard');
  const [noUsername, changeUsernameBool]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(true);
  const { userDispatch } = user;

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
      .then((data) => {})
      .catch((err) => console.log(err));
  }, [serverList]);

  // const setColorOfNav = (e) => {
  //   const currentRenderName: HTMLDivElement = e.target.attributes[1].value;
  //   const currentRenderDiv: HTMLDivElement = document.querySelector(
  //     `#${currentRenderName}`
  //   );
  //   currentRenderDiv.style.color = "red";
  // };

  const viewLatency = (e) => {
    setCurrentRender('latency');
  };
  const viewMultipleGraphs = () => {
    setCurrentRender('multipleGraphs');
  };
  const viewDashboard = () => {
    setCurrentRender('dashboard');
  };
  const viewHistory = () => {
    setCurrentRender('history');
  };

  function renderSwitch(param: string) {
    switch (param) {
      case 'latency':
        return 'latency';
      case 'history':
        return <HistoryGraphsContainer />;
      case 'multipleGraphs':
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
            <NavBarDashboard
              viewLatency={viewLatency}
              viewMultipleGraphs={viewMultipleGraphs}
              viewDashboard={viewDashboard}
              history={viewHistory}
            />
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
