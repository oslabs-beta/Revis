import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/Summary.module.scss';
import { useStore } from '../../context/Provider';

export default function SummaryTable(props) {
  const { metricsForTable } = props;
  // const { metricsStore }: Context = useStore();
  // const { metricState } = metricsStore;

  // useEffect(() => {
  //   console.log(metricsForTable, metricState);
  // }, [metricState]);

  return (
    <div className={styles.SummaryWrapper}>
      <div>
        {metricsForTable.length === 0 ? (
          <div>
            <h1>
              Select a server to view its metrics! {'\n'}
              <div>
                <FontAwesomeIcon icon={faSpinner} id={styles.loading} />
              </div>
            </h1>
          </div>
        ) : (
          <div>
            <div className={styles.tableWrapper}>{metricsForTable}</div>
          </div>
        )}
      </div>
    </div>
  );
}
