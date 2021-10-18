import React from "react";
import styles from "../../styles/Dashboard.module.scss";
function NavBarDashboard(props) {
    const {viewGraph,viewMultipleGraphs,viewDashboard}=props;
    return (
        <div className={styles.navBarDashboard}>
            <button type="button" onClick={viewGraph}>Single Graph</button>
            <button type="button" onClick={viewMultipleGraphs}>Multiple graphs</button>
            <button type="button" onClick={viewDashboard}>Summary</button>
        </div>
    )
}

export default NavBarDashboard;