import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import router from "next/router";
import { useStore } from "../../context/Provider";
import Sidebar from "./Sidebar";
import Summary from "./Summary";
import styles from "../../styles/Dashboard.module.scss";
import SignOutButton from "../Globals/SignOutButton";
import NavBarDashboard from "./NavBarDashboard";
import { Context } from "../../context/interfaces";
import Graph from "../Graphs/Singular/Graph";
import MultipleGraphContainer from "../Graphs/Multiple/MultipleGraphContainer";

export default function Dashboard() {
  const { user }: Context = useStore();
  const [currentRender, setCurrentRender] = useState("dashboard");
  const [noUsername, changeUsernameBool]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(true);
  const { userDispatch } = user;

  useEffect(() => {
    fetch("/api/validateUser")
      .then((response: Response) => response.json())
      .then((data) => {
        const { username, ssid }: { username: string; ssid: string } = data;
        if (!username || !ssid) return router.replace("/");
        userDispatch({ type: "updateUsername", message: username });
        changeUsernameBool(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const viewGraph = () => {
    setCurrentRender("graph");
  };
  const viewMultipleGraphs = () => {
    setCurrentRender("multipleGraphs");
  };
  const viewDashboard = () => {
    setCurrentRender("dashboard");
  };

  switch (currentRender) {
    case "graph":
      return (
        <div className={styles.dashboardWrapper}>
          {!noUsername && (
            <>
              <div className={styles.sidebarWrapper}>
                <NavBarDashboard
                  viewGraph={viewGraph}
                  viewMultipleGraphs={viewMultipleGraphs}
                  viewDashboard={viewDashboard}
                />
                <SignOutButton />
              </div>
              <Sidebar />
              <div className={styles.summaryWrapper}>
                <Graph />
              </div>
            </>
          )}
        </div>
      );
    case "multipleGraphs":
      return (
        <div className={styles.dashboardWrapper}>
          {!noUsername && (
            <>
              <div className={styles.sidebarWrapper}>
                <NavBarDashboard
                  viewGraph={viewGraph}
                  viewMultipleGraphs={viewMultipleGraphs}
                  viewDashboard={viewDashboard}
                />
                <SignOutButton />
                <Sidebar />
              </div>

              <div className={styles.summaryWrapper}>
                <MultipleGraphContainer />
              </div>
            </>
          )}
        </div>
      );
    default:
      return (
        <div className={styles.dashboardWrapper}>
          {!noUsername && (
            <>
              <div className={styles.sidebarWrapper}>
                <NavBarDashboard
                  viewGraph={viewGraph}
                  viewMultipleGraphs={viewMultipleGraphs}
                  viewDashboard={viewDashboard}
                />
                <SignOutButton />
                <Sidebar />
              </div>

              <div className={styles.summaryWrapper}>
                <Summary />
              </div>
            </>
          )}
        </div>
      );
  }
}
