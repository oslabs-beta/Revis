import React, { useState } from 'react';
import styles from '../styles/Homepage.module.scss';

function ForgotPassword(props) {
  const [userEmail, setUserEmail] = useState<any>('');
  const { previousPage } = props;
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
