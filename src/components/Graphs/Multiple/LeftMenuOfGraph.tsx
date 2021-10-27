import React, { ReactElement } from 'react';
import { Context } from '../../../context/interfaces';
import { useStore } from '../../../context/Provider';
import styles from '../../../styles/GraphContainer.module.scss';
import MetricsForGraph from './MetricsForGraph';

function LeftMenuOfGraph() {
  const { metricsStore, multipleGraphSelections }: Context = useStore();
  const metricsForCheckBoxes: ReactElement[] = [];
  if (Object.keys(metricsStore.metricState).length !== 0) {
    Object.entries(metricsStore.metricState[0]).forEach((el) => {
      if (el[0] !== 'time')
        metricsForCheckBoxes.push(<MetricsForGraph metricName={el[0]} />);
    });
  }
  return (
    <div id='leftMenuGraphs' className={styles.LeftMenu}>
      {Object.keys(multipleGraphSelections.multipleGraphState).length > 3 ? (
        <div className={styles.MaxGraphsMessage}>
          Only 4 graphs can be simultaneously displayed
        </div>
      ) : (
        ''
      )}
      <div id='leftMenuGraphs' className={styles.LeftMenu}>
        {metricsForCheckBoxes}
      </div>
    </div>
  );
}

export default LeftMenuOfGraph;
