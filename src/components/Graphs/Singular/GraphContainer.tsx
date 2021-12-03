import React from 'react';
import GraphWithHistory from '../Graph';
import styles from '../../../styles/GraphContainer.module.scss';
import { Context } from '../../../context/interfaces';
import { useStore } from '../../../context/Provider';
import { cleanNames } from '../../../functions/globalFunctions';

function GraphContainer() {
  const { metricsStore, metricToGraph }: Context = useStore();
  const data = metricsStore.metricState;

  return (
    <div className={styles.GraphContainer}>
      <GraphWithHistory
        metricValue={data}
        metricName={metricToGraph.metricToGraph}
        title={metricToGraph.metricToGraph}
        graphType="singular"
      />
    </div>
  );
}
export default GraphContainer;
