import RightSideLogin from "../components/UserLogin";
import LogoHomeScreen from "../components/LeftSideHomeScreen";
import Link from "next/link";
import UserLogin from "../components/UserLogin";
import ForgotPassword from "../components/ForgotPassword";
import SignUp from "../components/SignUp";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/Provider";
import styles from "../styles/RightSideLogin.module.scss";

function HomePage() {
  const [pages, setPages] = useState<string>("userLogin");

  const previousPage = () => {
    setPages("userLogin");
  };
  const onForgotPassword = () => {
    setPages("forgotPassword");
  };
  const onSignUp = () => {
    setPages("signUp");
  };

  return (
    <div className="homePageWrapper">
      <LogoHomeScreen />
      <div className="rightSide" >
        {pages === "userLogin" ? (
          <div id={styles.UserLogin}>
            <UserLogin
              onForgotPassword={onForgotPassword}
              onSignUp={onSignUp}
            />
          </div>
        ) : pages === "forgotPassword" ? (
          <ForgotPassword previousPage={previousPage} />
        ) : (
          <SignUp previousPage={previousPage} />
        )}
      </div>
    </div>
  );
}

export default HomePage;
