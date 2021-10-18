import React from "react";
import router from "next/router";
import styles from "../../styles/LandingPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";

function LandingPage() {
  return (
    <div className={styles.LandingPageWrapper}>
      <div className={styles.leftLandingPageWrapper}>
        <span><FontAwesomeIcon id={styles.cube} icon={faCube} /></span>
        <h1 id={styles.logo}>Revis</h1>
      </div>
      <div className={styles.rightLandingPageWrapper}>
        <h2>
          A dashboard to visualize your Redis metrics the way you deserve.
        </h2>
        <div className={styles.buttonDiv}>
          <button type="button" onClick={() => router.replace("/login")}>
            Start now
          </button>
          <button type="button" onClick={() => router.replace("/dashboard")}>
            Demo
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
