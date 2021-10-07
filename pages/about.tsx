import { useStore } from '../context/Provider';

export default function about() {
  const { user } : any  = useStore();
  return (
    <div>
      <h1> About us </h1>
      <p>{user.userState.username}</p>
    </div>
  );
}
