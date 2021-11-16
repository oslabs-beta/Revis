import React, { useState } from 'react';
import router from 'next/router';
import PropTypes from 'prop-types';
import styles from '../../styles/Homepage.module.scss';
import { User, HomePageProps } from '../../context/interfaces';

function SignUp({ previousPage }: HomePageProps) {
  const [userInfo, setUserInfo] = useState<User>({
    username: '',
    email: '',
    password: '',
  });
  const [disclaimer, setDisclaimer] = useState(false);
  const { username, password, email } = userInfo;

  const submitHandler = (e) => {
    e.preventDefault();
    fetch('/api/createUser', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        email,
      }),
      'Content-Type': 'application/json',
    })
      .then((response: Response) => {
        if (response.status === 200) {
          document.querySelector(
            '#messageDiv'
          ).innerHTML = `Welcome ${username}, you will be redirected to the dashboard shortly.`;
          setTimeout(() => router.replace('/dashboard'), 3000);
        } else throw response.json();
      })
      .catch((error) => {
        error.then((err) => {
          document.querySelector('#messageDiv').innerHTML = err.error;
        });
      });
  };
  if (!disclaimer) {
    return (
      <div className={styles.signUpComponentWrapper}>
        <h1>Sign Up</h1>

        <form onSubmit={submitHandler}>
          <div className={styles.formEntry}>
            <label htmlFor='username' className={styles.labels}>
              username:
              <input
                className={styles.userInput}
                type='text'
                onChange={(e) =>
                  setUserInfo({ ...userInfo, username: e.target.value })
                }
                value={userInfo.username}
                required
                autoComplete='none'
              ></input>
            </label>
          </div>

          <div className={styles.formEntry}>
            <label htmlFor='email' className={styles.labels}>
              email:
              <input
                className={styles.userInput}
                type='email'
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
                value={userInfo.email}
                required
                autoComplete='none'
              ></input>
            </label>
          </div>

          <div className={styles.formEntry}>
            <label htmlFor='password' className={styles.labels}>
              password:
              <input
                className={styles.userInput}
                type='password'
                onChange={(e) =>
                  setUserInfo({ ...userInfo, password: e.target.value })
                }
                required
                autoComplete='none'
              ></input>
            </label>
          </div>

          <div id='messageDiv' name='Log-in Errors'></div>

          <div className={styles.buttonWrapper}>
            <button
              className={styles.backButton}
              onClick={previousPage}
              type='button'
            >
              Back
            </button>

            <button
              className={styles.submitButton}
              type='button'
              onClick={() => setDisclaimer(true)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
  return (
    <div className={styles.signUpComponentWrapper}>
      <span className={styles.disclaimer}>
        Ensuring your privacy is important to us. We are serious about
        protecting our users and addressing privacy concerns. When you sign up
        or use Revis, you agree to the collection of information to enhance,
        personalize, and support your experience on the site. We do not share
        your information with third parties.
        <div className={styles.disclaimerBtns}>
          <button
            id={styles.disclaimerBtnNo}
            type='button'
            onClick={() => setDisclaimer(false)}
          >
            No, thanks
          </button>
          <button
            id={styles.disclaimerBtnYes}
            type='button'
            onClick={submitHandler}
          >
            I accept
          </button>
        </div>
      </span>
    </div>
  );
}

SignUp.propTypes = {
  previousPage: PropTypes.func.isRequired,
};

export default SignUp;
