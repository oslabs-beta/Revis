<<<<<<< HEAD
import RightSideLogin from '../components/UserLogin';
import LogoHomeScreen from '../components/LeftSideHomeScreen';
import Link from 'next/link';
import { useContext, } from 'react';
=======
import UserLogin from '../components/UserLogin';
import ForgotPassword from '../components/ForgotPassword';
import SignUp from '../components/SignUp';
import { useContext, useState } from 'react';
>>>>>>> f8086ce8b593b1073c55c5cffcda6ea2f33e7ac7
import { GlobalContext } from '../context/Provider';
import styles from '../styles/RightSideLogin.module.scss';


function HomePage() {
<<<<<<< HEAD

  const logIn = (userInfo) => {
=======
  const [pages, setPages] = useState<string>('userLogin');
  const testingState = useContext(GlobalContext);
  const login = (userInfo) => {
>>>>>>> f8086ce8b593b1073c55c5cffcda6ea2f33e7ac7
    //fetch here
    console.log(userInfo);
  };

<<<<<<< HEAD
  
  return (
    <div className= "homePageWrapper">
      <div>
      <LogoHomeScreen />
      </div>
      <div>
        <RightSideLogin logIn={logIn} />
     
     
        <Link href='/ForgotPassword'>
          <button>Forgot Password?</button>
        </Link>
     
     
        <Link href='/SignUp'>
          <button>SignUp</button>
        </Link>
      </div>
      </div>
  )
};
=======
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
            <UserLogin login={login} />
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
>>>>>>> f8086ce8b593b1073c55c5cffcda6ea2f33e7ac7

export default HomePage;
