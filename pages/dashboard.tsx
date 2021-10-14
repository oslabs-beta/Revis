import React, { useEffect, useState } from 'react';
import router from 'next/router';
import { useStore } from '../context/Provider';
import Sidebar from '../components/Sidebar';
import Summary from '../components/Summary';
import styles from '../styles/Dashboard.module.scss';
import SignOutButton from '../components/SignOutButton';

export default function dashboard() {
  const { user }: any = useStore();
  const [noUsername, changeUsernameBool] = useState(true);
  const {
    userDispatch,
  }: { userState: { username: string }; userDispatch: Function } = user;

  useEffect(() => {
    fetch('/api/validateUser')
      .then((response) => response.json())
      .then((data) => {
        const { username, ssid }: { username: string; ssid: string } = data;
        if (!username || !ssid) return router.replace('/');
        userDispatch({ type: 'updateUsername', message: username });
        changeUsernameBool(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={styles.dashboardWrapper}>
      {!noUsername && (
        <>
          <div className={styles.sidebarWrapper}>
            <SignOutButton />
            <Sidebar />
          </div>

          <div className={styles.summaryWrapper}>
            <Summary />
          </div>
        </>
      )}
    </div>
  );
}
