import React, { useState, useEffect } from 'react';
import router from 'next/router';
import PropTypes from 'prop-types';
import styles from '../styles/RightSideLogin.module.scss';
import { useStore } from '../context/Provider';

function UserLogin(props) {
  const [userInfo, setUserInfo] = useState<any>({ userName: '', password: '' });
  const [finalUser, setFinalUser] = useState<any>('');
  const { onForgotPassword, onSignUp } = props;
  const { user }: any = useStore();

  useEffect(() => {
    user.userDispatch({ type: 'updateUsername', message: finalUser });
  }, [finalUser]);

  const { username, password } = userInfo;
  const onSubmitHandler = (e) => {
    e.preventDefault();

    fetch('/api/userLogin', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      'Content-Type': 'application/json',
    })
      .then((results) => {
        if (results.status === 200) {
          setFinalUser(username);
          router.replace('/dashboard');
        } else throw results;
      })
      .catch((error) => {
        document.querySelector('#errorDiv').innerHTML = error.error;
      });
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={onSubmitHandler}>
        <div>
          <input
            className={styles.userInput}
            placeholder="username"
            type="text"
            onChange={(e) =>
              setUserInfo({ ...userInfo, username: e.target.value })
            }
            value={username}
            required
          ></input>
        </div>
        <div>
          <input
            className={styles.userInput}
            placeholder="password"
            type="password"
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
            required
          ></input>
        </div>
        <div className={styles.logInButtonWrapper}>
          <input id={styles.logInButton} type="submit" value="Login" />
        </div>
      </form>
      <div className={styles.logInButtonWrapper}>
        <button
          id={styles.forgotPasswordButton}
          onClick={onForgotPassword}
          type="button"
        >
          Forgot Password?
        </button>
      </div>
      <div className={styles.signUpWrapper}>
        <span>First time?</span>
        <button id={styles.signUpButton} onClick={onSignUp} type="button">
          Sign Up
        </button>
      </div>
    </div>
  );
}

UserLogin.propTypes = {
  onForgotPassword: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
};

export default UserLogin;
