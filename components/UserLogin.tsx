import { route } from 'next/dist/server/router';
import React, { useState, useEffect } from 'react';
import router from 'next/router';
import styles from '../styles/RightSideLogin.module.scss';
import { useStore } from '../context/Provider';

function UserLogin(props) {
  const [userInfo, setUserInfo] = useState<any>({ userName: '', password: '' });
  const [finalUser, setFinalUser] = useState <any>('');
  const { onForgotPassword, onSignUp } = props;
  const { user }: any = useStore();

  useEffect(() => {
    user.userDispatch({ type: 'updateUsername', message: userInfo.userName });
  },[finalUser]);
 
  const onSubmitHandler = (e) => {
    e.preventDefault();

    fetch('/api/userLogIn', {
      method: 'POST',
      body: JSON.stringify({
        username: userInfo.userName,
        password: userInfo.password,
      }),
      'content-type': 'application/json',
    }).then((data) => {
      if (data.status === 200) {
        setFinalUser(userInfo)
        router.replace('/about');
      }
    });
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={onSubmitHandler}>
        <div>
          <input
            className={styles.userInput}
            placeholder='username'
            type='text'
            onChange={(e) =>
              setUserInfo({ ...userInfo, userName: e.target.value })
            }
            value={userInfo.userName}
            required
          ></input>
        </div>
        <div>
          <input
            className={styles.userInput}
            placeholder='password'
            type='password'
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
            required
          ></input>
        </div>
        <div className={styles.logInButtonWrapper}>
          <input id={styles.logInButton} type='submit' value='Login' />
        </div>
      </form>
      <div className={styles.logInButtonWrapper}>
        <button id={styles.forgotPasswordButton} onClick={onForgotPassword}>
          Forgot Password?
        </button>
      </div>
      <div className={styles.signUpWrapper}>
        <span>First time?</span>
        <button id={styles.signUpButton} onClick={onSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default UserLogin;
