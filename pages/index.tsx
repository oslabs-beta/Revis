import RightSideLogin from '../components/UserLogin';
import LogoHomeScreen from '../components/LeftSideHomeScreen';
import Link from 'next/link';
import UserLogin from '../components/UserLogin';
import ForgotPassword from '../components/ForgotPassword';
import SignUp from '../components/SignUp';
import { useContext, useState } from 'react';
import { GlobalContext } from '../context/Provider';
import styles from '../styles/RightSideLogin.module.scss';

function HomePage() {
  const [pages, setPages] = useState<string>('userLogin');
  const testingState = useContext(GlobalContext);

  const login = (userInfo) => {
    //fetch here
    console.log(userInfo);
  };

  const previousPage = () => {
    setPages('userLogin');
  };
  const onForgotPassword = () => {
    setPages('forgotPassword');
  };
  const onSignUp = () => {
    setPages('signUp');
  };

  switch (pages) {
    case 'userLogin':
      return (
        <div className={styles.RightSideLogin}>
          <div>
            <UserLogin />
          </div>
          <div>
            <button onClick={onForgotPassword}>Forgot Password?</button>
          </div>
          <div>
            <button onClick={onSignUp}>SignUp</button>
          </div>
        </div>
      );
    case 'forgotPassword':
      return (
        <div>
          <ForgotPassword previousPage={previousPage} />
        </div>
      );
    case 'signUp':
      return (
        <div>
          <SignUp previousPage={previousPage} />
        </div>
      );
  }
}

export default HomePage;
