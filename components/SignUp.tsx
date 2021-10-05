import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/RightSideLogin.module.scss";

function SignUp(props) {
  const [userInfo, setUserInfo] = useState<any>({
    userName: "",
    email: "",
    password: "",
  });

  const previousPage = props.previousPage;

  const submitHandler = (e) => {
    const body = {
      username: userInfo.userName,
      password: userInfo.password,
      email: userInfo.email,
    };
    console.log(body);
    e.preventDefault();
    fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        username: userInfo.userName,
        password: userInfo.password,
        email: userInfo.email,
      }),
      "content-type": "application/json",
    })
      .then((data) => data.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label>username:</label>
          <input
            className={styles.userInput}
            type="text"
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
            className={styles.userInput}
            type="email"
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
            className={styles.userInput}
            type="password"
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
            required
          ></input>
        </div>
        <input className={styles.submitButton} type="submit" value="SUBMIT" />
      </form>
      <button className={styles.backButton} onClick={() => previousPage()}>
        Back
      </button>
    </div>
  );
}

export default SignUp;
