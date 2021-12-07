import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import router from 'next/router';
import useStore from '../../context/hooks/useStore';
import Sidebar from './Sidebar';
import Summary from './Summary';
import styles from '../../styles/Dashboard.module.scss';
import NavBarDashboard from './NavBarDashboard';
import { Context, Metrics } from '../../context/interfaces';
import MultipleGraphContainer from '../Graphs/Multiple/MultipleGraphContainer';
import HistoryGraphsContainer from '../Graphs/History/HistoryGraphContainer';
import Welcome from '../Globals/Welcome';
import UpdateInterval from '../Globals/UpdateInterval';
import GraphContainer from '../Graphs/Singular/GraphContainer';
import { onLoadFetch } from '../../functions/globalFunctions';
import {
  ADD_SERVER,
  UPDATE_USERNAME,
} from '../../context/constants/actionTypes';

export default function Dashboard() {
  const { user, metricsStore, servers, currentServer, metricHistory }: Context =
    useStore();
  const { metricState, metricsDispatch } = metricsStore;
  const { serverList } = servers;
  const { selectedServerDispatch } = currentServer;
  const [cooldown, updateCoolDown] = useState(true);

  const [currentRender, setCurrentRender] = useState('dashboard');
  const [noUsername, changeUsernameBool]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(true);
  const { userDispatch } = user;
  const { metricHistoryDispatch } = metricHistory;

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
    if (!metricState) return;
    if (metricState.length % 10 === 0 && cooldown) {
      updateCoolDown(false);
      storeDataInPG();
      setTimeout(() => updateCoolDown(true), 1000 * 60);
    }
  }, [metricState]);

  useEffect(() => {
    fetch('/api/validateUser')
      .then((response: Response) => response.json())
      .then((data) => {
        const { username, ssid }: { username: string; ssid: string } = data;
        if (!username || !ssid) return router.replace('/');
        userDispatch({ type: UPDATE_USERNAME, message: username });
        changeUsernameBool(false);
      })
      .catch((err) => console.log(err));

    if (serverList.length > 0) {
      // Auto select the first server in the server list
      const server = serverList[0];
      onLoadFetch(
        server,
        selectedServerDispatch,
        metricsDispatch,
        updateCoolDown
      );
    }

    fetch('/api/storeMetrics')
      .then((response: Response) => response.json())
      .then((data) => {
        metricHistoryDispatch({
          type: ADD_SERVER,
          message: data.serversAndDates,
        });
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
      case 'Single graph':
        return <GraphContainer />;
      default:
        return <Summary changeCurrentRender={setCurrentRender} />;
    }
  }

  return (
    <div className={styles.dashboardWrapper}>
      {!noUsername && (
        <>
          <div className={styles.sidebarWrapper}>
            <Welcome />
            <NavBarDashboard changeCurrentRender={changeCurrentRender} />
            <Sidebar />
            <UpdateInterval />
          </div>
          <div className={styles.summaryWrapper}>
            {renderSwitch(currentRender)}
          </div>
        </>
      )}
    </div>
  );
}
