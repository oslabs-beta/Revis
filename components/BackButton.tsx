import React from "react";
import router from "next/router";
import styles from "../styles/GraphContainer.module.scss";

function BackButton() {


    return (
      <button id={styles.backButton} type="button" onClick={() => router.replace("/dashboard")}>
        Back
      </button>
    );
}


export default BackButton;
