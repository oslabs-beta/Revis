import React, { ReactElement } from 'react';
import useStore from '../../../context/hooks/useStore';
import GraphWithHistory from '../Graph';
import LeftMenuOfGraph from './LeftMenuOfGraph';
import styles from '../../../styles/GraphContainer.module.scss';
import { Context } from '../../../context/interfaces';

function MultipleGraphContainer() {
  const { multipleGraphSelections, metricsStore }: Context = useStore();
  const arrayWithGraphs: ReactElement[] = [];

  const data = metricsStore.metricState;

  let i: number = 0;

  Object.keys(multipleGraphSelections.multipleGraphState).forEach((key) => {
    if (multipleGraphSelections.multipleGraphState[key]) {
      arrayWithGraphs.push(
        <div key={i}>
          <GraphWithHistory
            metricValue={data}
            metricName={key}
            title={key}
            graphType="multiple"
          />
        </div>
      );
    }
    i += 1;
  });

  return (
    <div>
      <div className={styles.MultipleGraphContainer}>
        <LeftMenuOfGraph />
        <div className={styles.GraphFlex}>{arrayWithGraphs}</div>
      </div>
    </div>
  );
}
export default MultipleGraphContainer;
