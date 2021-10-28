import React, { useState } from 'react';
import LogoHomeScreen from '../components/Homepage/LeftSideHomeScreen';
import UserLogin from '../components/Homepage/UserLogin';
import ForgotPassword from '../components/Homepage/ForgotPassword';
import HTMLHeader from '../components/Globals/HTMLHeader';
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

  const renderSwitch = (page: string) => {
    switch (page) {
      case 'forgotPassword':
        return <ForgotPassword previousPage={previousPage} />;
      case 'signUp':
        return <SignUp previousPage={previousPage} />;
      default:
        return (
          <UserLogin onForgotPassword={onForgotPassword} onSignUp={onSignUp} />
        );
    }
  };

  return (
    <div className={styles.homePageWrapper}>
      <HTMLHeader />
      <LogoHomeScreen />
      {renderSwitch(pages)}
    </div>
  );
}

export default HomePage;
