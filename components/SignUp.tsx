import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/RightSideLogin.module.scss';
import { User } from '../interfaces';

interface SignUpProps {
  previousPage: () => () => void;
}

function SignUp({ previousPage }: SignUpProps) {
  const [userInfo, setUserInfo] = useState<User>({
    username: '',
    email: '',
    password: '',
  });

  const { username, password, email } = userInfo;

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('/api/user', {
      method: 'POST',
      // headers: requestHeaders,
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
          // onClick={() => router.replace('/dashboard')}
          className={styles.submitButton}
          type="submit"
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

SignUp.propTypes = {
  previousPage: PropTypes.func.isRequired,
};

export default SignUp;
