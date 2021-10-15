import React, { useState } from 'react';
import styles from '../../styles/Homepage.module.scss';
import PropTypes from 'prop-types'
import { HomePageProps } from '../../context/interfaces';

function ForgotPassword({ previousPage }: HomePageProps) {
  const [userEmail, setUserEmail] = useState<string>('');
  const onSubmitHandler = (e) => {
    e.preventDefault();
    /* fetch here */
    console.log(userEmail);
  };
  return (
    <div className={styles.forgotPasswordWrapper}>
      <h1>Password Reset Page</h1>
      <form>
        <div>
          <label>email:</label>
          <input
            className="userInput"
            type="email"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
            required
          ></input>
        </div>
      </form>
      <div className={styles.buttonWrapper}>
        <button onClick={previousPage}>Back</button>
        <button onClick={(e) => onSubmitHandler(e)}>Submit</button>
      </div>
    </div>
  );
}

export default ForgotPassword;

ForgotPassword.PropTypes = {
  previousPage: PropTypes.func.isRequired,
};