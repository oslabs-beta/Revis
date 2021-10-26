import React from "react";
import router from "next/router";
import styles from "../../styles/LandingPage.module.scss";

function NavBarLandingPage() {
  return (
    <div className={styles.NavBar}>
        <button type="button" onClick={()=>router.replace("/aboutus")}>
        Download
      </button>
      <button type="button" onClick={()=>router.replace("/aboutus")}>
        Documentation
      </button>
      <button type="button" onClick={()=>router.replace("/aboutus")}>
        About us
      </button>
    
    </div>
  );
}

export default NavBarLandingPage;
