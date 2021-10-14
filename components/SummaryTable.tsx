import React, { useState, useEffect } from 'react';
import router from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Summary.module.scss';

export default function SummaryTable(props) {
  const { metricsForTable } = props;

  return (
    <div className={styles.SummaryWrapper}>
      <div>
        {metricsForTable.length === 0 ? (
          <div>
            <h1>
              <FontAwesomeIcon icon={faSpinner} id={styles.loading} />
            </h1>
          </div>
        ) : (
          <div>
            <h1> Summary </h1>
            <div className={styles.tableWrapper}>{metricsForTable}</div>
          </div>
        )}
      </div>
      {metricsForTable.length !== 0 && (
        <button type="button" onClick={() => router.replace('/graphs')}>
          Graphs
        </button>
      )}
    </div>
  );
}
