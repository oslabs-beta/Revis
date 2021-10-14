import React from 'react';
import router from 'next/router';
import styles from '../styles/Dashboard.module.scss';

function SignOutButton() {
  const signOut = () => {
    fetch('/api/signOut').then((response) => router.replace('/'));
  };
  return (
    <button type="button" onClick={signOut} id={styles.signOutButton}>
      Sign Out
    </button>
  );
}

export default SignOutButton;
