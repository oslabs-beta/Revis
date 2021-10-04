import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/RightSideLogin.module.scss';

function SignUp(props) {
  const [userInfo, setUserInfo] = useState<any>({
    userName: '',
    email: '',
    password: '',
  });

  const previousPage = props.previousPage;

  const submitHandler = (e) => {
    e.preventDefault();
    /*fetch here */
    console.log(userInfo);
  };
  
  return (
    <div id={styles.SignUp} className={styles.RightSideLogin}>
      <h1>Sign Up Page</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label>username:</label>
          <input
            type='text'
            onChange={(e) =>
              setUserInfo({ ...userInfo, userName: e.target.value })
            }
            value={userInfo.userName}
            required
          ></input>
        </div>
        <div>
          <label>email:</label>
          <input
            type='email'
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
            value={userInfo.email}
            required
          ></input>
        </div>
        <div>
          <label>password:</label>
          <input
            type='password'
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
            required
          ></input>
        </div>
        <input type='submit' value='SUBMIT' />
      </form>
      <button onClick={() => previousPage()}>Back</button>
    </div>
  );
}

export default SignUp;
