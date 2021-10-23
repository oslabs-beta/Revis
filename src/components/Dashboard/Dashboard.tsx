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
import UpdateInterval from '../Globals/UpdateInterval';

export default function Dashboard() {
  const { user }: Context = useStore();
  const [currentRender, setCurrentRender] = useState('dashboard');
  const [noUsername, changeUsernameBool]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(true);
  const { userDispatch } = user;

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
  }, []);

  useEffect(() => {
    fetch('/api/storeMetrics')
      .then((response: Response) => response.json())
      .then((data) => {})
      .catch((err) => console.log(err));
  }, []);

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
        return 'history';
      case 'multipleGraphs':
        return (
          <div>
            <MultipleGraphContainer /> <UpdateInterval />
          </div>
        );
      default:
        return (
          <div>
            <Summary /> <UpdateInterval />
          </div>
        );
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
