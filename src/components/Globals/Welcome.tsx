import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
import router from 'next/router';
import useStore from '../../context/hooks/useStore';
import { Context } from '../../context/interfaces';
import styles from '../../styles/Welcome.module.scss';

function Welcome() {
  const { user }: Context = useStore();
  const signOut = () => {
    fetch('/api/signOut').then(() => router.replace('/'));
  };
  function showDropdown() {
    document
      .querySelector(`.${styles.dropdowncontent}`)
      .classList.toggle(`${styles.show}`);
  }
  return (
    <div className={styles.Welcome}>
      <h4>Signed in as </h4>
      <button type="button" id={styles.dropbtn} onClick={showDropdown}>
        {user.userState.username}
        <FontAwesomeIcon
          icon={faArrowCircleDown}
          className={styles.arrowDown}
        />
      </button>
      <div id={styles.myDropdown} className={styles.dropdowncontent}>
        <button type="button" onClick={signOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
export default Welcome;
