import React from 'react';
import { useStore } from '../../context/Provider';
import styles from '../../styles/Welcome.module.scss';
import { User } from '../../context/interfaces';

function Welcome() {
  const { user } = useStore<User>();

  return (
    <div className={styles.Welcome}>
      <h4>Welcome {user.userState.username}!</h4>
    </div>
  );
}
export default Welcome;
