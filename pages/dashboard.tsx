import { useContext } from 'react';
import { GlobalContext } from '../context/Provider';
import Sidebar from '../components/Sidebar';

export default function about() {
  return (
    <div className="dashboardWrapper">
      <Sidebar />
    </div>
  );
}
