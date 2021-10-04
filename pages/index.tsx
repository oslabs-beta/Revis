import RightSideLogin from '../components/UserLogin';
import LogoHomeScreen from '../components/LeftSideHomeScreen';
import Link from 'next/link';
import { useContext, } from 'react';
import { GlobalContext } from '../context/Provider';



function HomePage() {

  const logIn = (userInfo) => {
    //fetch here
    console.log(userInfo);
  };

  
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

export default HomePage;
