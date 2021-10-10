import React, { useState } from 'react';
import router from 'next/router';
import PropTypes from 'prop-types';
import styles from '../styles/RightSideLogin.module.scss';
import { useStore } from '../context/Provider';
import { User } from '../interfaces';

interface UserLoginProps {
  // use type Function or () => void if no arguments
  onForgotPassword: () => void;
  onSignUp: () => void;
};

function UserLogin({ onForgotPassword, onSignUp }: UserLoginProps) {
  const [userInfo, setUserInfo] = useState<User>({ username: '', password: '' });
  const { user }: any = useStore();
  const { username, password } = userInfo;
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch('/api/userLogin', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      'Content-Type': 'application/json',
    })
      .then((response: Response) => {
        if (response.status === 200) {
          user.userDispatch({ type: 'updateUsername', message: username });
          router.replace('/dashboard');
        } else throw response;
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
      <div id="errorDiv"></div>
    </div>
  );
}

UserLogin.propTypes = {
  onForgotPassword: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
};

export default UserLogin;
