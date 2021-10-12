import React, { useState } from 'react';
import LogoHomeScreen from '../components/LeftSideHomeScreen';
import UserLogin from '../components/UserLogin';
import ForgotPassword from '../components/ForgotPassword';
import SignUp from '../components/SignUp';
import styles from '../styles/Homepage.module.scss';

function HomePage() {
  const [pages, setPages] = useState<string>('userLogin');

  const previousPage = () => {
    setPages('userLogin');
  };
  const onForgotPassword = () => {
    setPages('forgotPassword');
  };
  const onSignUp = () => {
    setPages('signUp');
  };

  return (
    <div className={styles.homePageWrapper}>
      <LogoHomeScreen />
      <div className="rightSide">
        {pages === 'userLogin' ? (
          <UserLogin onForgotPassword={onForgotPassword} onSignUp={onSignUp} />
        ) : pages === 'forgotPassword' ? (
          <ForgotPassword previousPage={previousPage} />
        ) : (
          <SignUp previousPage={previousPage} />
        )}
      </div>
    </div>
  );
}

export default HomePage;
