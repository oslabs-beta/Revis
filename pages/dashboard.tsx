import { useContext } from "react";
import { GlobalContext } from "../context/Provider";
import Sidebar from "../components/Sidebar";
import Summary from "../components/Summary";

export default function about() {
  return (
    <div className="dashboardWrapper">
      <div>
        <Sidebar />
      </div>
      <div>
        <Summary />
      </div>
    </div>
  );
}
