import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Homepage.module.scss';
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
    fetch('/api/createUser', {
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
    <div className={styles.signUpComponentWrapper}>
      <h1>Sign Up</h1>

      <form onSubmit={submitHandler}>
        <div className={styles.formEntry}>
          <label htmlFor="username" className={styles.labels}>
            username:
            <input
              className={styles.userInput}
              type="text"
              onChange={(e) =>
                setUserInfo({ ...userInfo, username: e.target.value })
              }
              value={userInfo.username}
              required
              autoComplete="none"
            ></input>
          </label>
        </div>

        <div className={styles.formEntry}>
          <label htmlFor="email" className={styles.labels}>
            email:
            <input
              className={styles.userInput}
              type="email"
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              value={userInfo.email}
              required
              autoComplete="none"
            ></input>
          </label>
        </div>

        <div className={styles.formEntry}>
          <label htmlFor="password" className={styles.labels}>
            password:
            <input
              className={styles.userInput}
              type="password"
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
              required
              autoComplete="none"
            ></input>
          </label>
        </div>

        <div className={styles.buttonWrapper}>
          <button
            className={styles.backButton}
            onClick={previousPage}
            type="button"
          >
            Back
          </button>

          <button
            // onClick={() => router.replace('/dashboard')}
            className={styles.submitButton}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

SignUp.propTypes = {
  previousPage: PropTypes.func.isRequired,
};

export default SignUp;
