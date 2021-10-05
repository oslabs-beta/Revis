import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/RightSideLogin.module.scss';

function ForgotPassword(props) {
  const [userEmail, setUserEmail] = useState<any>('');
  const previousPage = props.previousPage;
  const onSubmitHandler = (e) => {
    e.preventDefault();
    /*fetch here */
    console.log(userEmail);
  };
  return (
    <div>
      <h1>Password Reset Page</h1>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label>email:</label>
          <input
            className='userInput'
            type='email'
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
            required
          ></input>
        </div>
        <input className='submitButton' type='submit' value='SUBMIT' />
      </form>
      <button className='backButton' onClick={() => previousPage()}>
        Back
      </button>
    </div>
  );
}

export default ForgotPassword;
