import RightSideLogin from '../components/UserLogin';
import Link from 'next/link';
import Button from '../components/Button';
import { useContext } from 'react';
import { GlobalContext } from '../context/Provider';


function HomePage() {
  const testingState = useContext(GlobalContext);
  const logIn = (userInfo) => {
    //fetch here
    console.log(userInfo);
  };

  
  return (
    <div>
      <div>
        Welcome to Next.js!
        <p>{testingState.userState.user.username}</p>
        <Button />
      </div>
      <div>
        <RightSideLogin logIn={logIn} />
      </div>
      <div>
        <Link href='/ForgotPassword'>
          <button>Forgot Password?</button>
        </Link>
      </div>
      <div>
        <Link href='/SignUp'>
          <button>SignUp</button>
        </Link>
      </div>
      </div>
  )
};

export default HomePage;
