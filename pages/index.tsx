import Button from '../components/Button';
import { useContext } from 'react';
import { GlobalContext } from '../context/Provider';
function HomePage() {
  const testingState = useContext(GlobalContext);
  
  return (
    <div>
      Welcome to Next.js!
      <p>{testingState.userState.user.username}</p>
      <Button />
    </div>
  );
}

export default HomePage;
