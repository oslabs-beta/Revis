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
  const { user, metricHistory }: Context = useStore();
  const [currentRender, setCurrentRender] = useState('dashboard');
  const [noUsername, changeUsernameBool]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(true);
  const { userDispatch } = user;
  const { metricHistoryDispatch, metricHistoryState } = metricHistory;

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
  }, []);

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
