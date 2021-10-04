import React, { useState } from 'react';
import styles from '../styles/RightSideLogin.module.scss';

function UserLogin(props) {
  const [userInfo, setUserInfo] = useState<any>({ userName: '', password: '' });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.logIn(userInfo);
  };

  return (
    <div id={styles.UserLogin}>
      <h1>Log In Page</h1>
      <form onSubmit={onSubmitHandler}>
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
          <label>password:</label>
          <input
            type='password'
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
            required
          ></input>
        </div>
        <input type='submit' value='LOGIN' />
      </form>
    </div>
  );
}

export default UserLogin;
