import React from 'react';
import { Context } from '../../context/interfaces';
import { useStore } from '../../context/Provider';
import styles from '../../styles/Welcome.module.scss';

function Welcome() {
  const { user }: Context = useStore();

  return (
    <div className={styles.Welcome}>
      <h4>Signed in as </h4>
      <h5>{user.userState.username}</h5>
    </div>
  );
}
export default Welcome;
