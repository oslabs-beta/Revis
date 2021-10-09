import React, { useState } from 'react';
import router from 'next/router';
import styles from '../styles/RightSideLogin.module.scss';

function SignUp() {
  const [userInfo, setUserInfo] = useState<any>({
    username: '',
    email: '',
    password: '',
  });

  const { username, password, email } = userInfo;

  const submitHandler = (e) => {
    e.preventDefault();
    fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        email,
      }),
      'Content-Type': 'application/json',
    }).then((data) => console.log(data));
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="username">
            username:
            <input
              className={styles.userInput}
              type="text"
              onChange={(e) =>
                setUserInfo({ ...userInfo, username: e.target.value })
              }
              value={userInfo.username}
              required
            ></input>
          </label>
        </div>
        <div>
          <label htmlFor="email">
            email:
            <input
              className={styles.userInput}
              type="email"
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              value={userInfo.email}
              required
            ></input>
          </label>
        </div>
        <div>
          <label htmlFor="password">
            password:
            <input
              className={styles.userInput}
              type="password"
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
              required
            ></input>
          </label>
        </div>
        <button
          onClick={() => router.replace('/dashboard')}
          className={styles.submitButton}
          type="button"
        >
          Submit
        </button>
      </form>
      <button
        className={styles.backButton}
        onClick={previousPage}
        type="button"
      >
        Back
      </button>
    </div>
  );
}

export default SignUp;
