import React, { useState } from 'react';
import LogoHomeScreen from '../components/Homepage/LeftSideHomeScreen';
import UserLogin from '../components/Homepage/UserLogin';
import ForgotPassword from '../components/Homepage/ForgotPassword';
import SignUp from '../components/Homepage/SignUp';
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
      {pages === 'userLogin' ? (
        <UserLogin onForgotPassword={onForgotPassword} onSignUp={onSignUp} />
      ) : pages === 'forgotPassword' ? (
        <ForgotPassword previousPage={previousPage} />
      ) : (
        <SignUp previousPage={previousPage} />
      )}
    </div>
  );
}

export default HomePage;
