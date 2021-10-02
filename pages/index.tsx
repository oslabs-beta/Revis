import RightSideLogin from '../components/UserLogin';
import Link from 'next/link';
import { userInfo } from 'os';

function HomePage() {
  const logIn = (userInfo) => {
    //fetch here
    console.log(userInfo);
  };

  return (
    <div>
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
  );
}

export default HomePage;
