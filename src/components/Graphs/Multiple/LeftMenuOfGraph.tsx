import React, { ReactElement } from 'react';
import { Context } from '../../../context/interfaces';
import { useStore } from '../../../context/Provider';
import styles from '../../../styles/GraphContainer.module.scss';
import MetricsForGraph from './MetricsForGraph';

function LeftMenuOfGraph() {
  const { metricsStore, multipleGraphSelections }: Context = useStore();
  const metricsForCheckBoxes: ReactElement[] = [];

  Object.keys(metricsStore.metricState[0]).forEach((metricName) => {
    if (metricName !== 'time')
      metricsForCheckBoxes.push(<MetricsForGraph metricName={metricName} />);
  });
  return (
    <div id="leftMenuGraphs" className={styles.LeftMenu}>
      {Object.keys(multipleGraphSelections.multipleGraphState).length > 3 ? (
        <div className={styles.MaxGraphsMessage}>
          Only 4 graphs can be simultaneously displayed
        </div>
      ) : (
        ''
      )}

      {metricsForCheckBoxes}
    </div>
  );
}

export default LeftMenuOfGraph;
