import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import router from 'next/router';
import { useStore } from '../../context/Provider';
import Sidebar from './Sidebar';
import Summary from './Summary';
import styles from '../../styles/Dashboard.module.scss';
import SignOutButton from '../Globals/SignOutButton';
import { UserProvider } from '../../context/interfaces';

export default function Dashboard() {
  const { user }: UserProvider = useStore();
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
