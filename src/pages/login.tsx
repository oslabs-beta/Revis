import React, { useState } from 'react';
import Head from 'next/head';
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
      <Head>
        <title> Revis - Redis Performance Visualization Tool</title>
        <meta
          name="keywords"
          content="HTML, CSS, JavaScript, Redis, caching, optimization, tools, visualization, visualizer, visual, performance, improvement"
        ></meta>
        <meta
          name="description"
          content="Redis performance enhancer visualization tool"
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta
          name="author"
          content="Liam Fontes, Mercedes Kalaizic, Chao Yu, Jason Zeng"
        ></meta>
      </Head>
      <LogoHomeScreen />
      {renderSwitch(pages)}
    </div>
  );
}

export default HomePage;
