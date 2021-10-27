import React from 'react';
import Graph from './Graph';
import BackButton from '../../Globals/BackButton';
import styles from '../../../styles/GraphContainer.module.scss';
import SignOutButton from '../../Globals/SignOutButton';

function GraphContainer() {
  return (
    <div className={styles.GraphContainer}>
      <SignOutButton />
      <div>
        <BackButton />
      </div>

      <Graph />
    </div>
  );
}
export default GraphContainer;
