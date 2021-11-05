import React from 'react';
import Graph from './Graph';
import styles from '../../../styles/GraphContainer.module.scss';

function GraphContainer() {
  return (
    <div className={styles.GraphContainer}>
      <Graph />
    </div>
  );
}
export default GraphContainer;
