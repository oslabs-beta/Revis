import React, { ReactElement } from 'react';
import GridLayout from 'react-grid-layout';
import { useStore } from '../../../context/Provider';
import MultipleGraph from '../Multiple/MultipleGraph';
import DatesMenu from './DatesMenu';
import styles from '../../../styles/GraphContainer.module.scss';
import { Context } from '../../../context/interfaces';
import { Layouts } from '../../context/interfaces';
import UpdateInterval from '../../Globals/UpdateInterval';

function HistoryGraphsContainer() {
  const { multipleGraphSelections, metricsStore }: Context = useStore();
  const arrayWithGraphs: ReactElement[] = [];

  const data = metricsStore.metricState;

  let i: number = 0;
  const layouts: Layouts = { 0: [0, 0], 1: [10, 0], 2: [0, 10], 3: [10, 10] };

  Object.keys(multipleGraphSelections.multipleGraphState).forEach((key) => {
    if (multipleGraphSelections.multipleGraphState[key]) {
      arrayWithGraphs.push(
        <div
          key={i}
          data-grid={{ x: layouts[i][0], y: layouts[i][0], w: 6, h: 1.2 }}
        >
          <MultipleGraph metricValue={data} metricName={key} />
        </div>
      );
    }
    i += 1;
  });

  return (
    <div className={styles.MultipleGraphContainer}>
      <DatesMenu />
      <div className={styles.GraphFlex}>
        <GridLayout rowHeight={300} width={800}>
          {arrayWithGraphs}
        </GridLayout>
      </div>
      <UpdateInterval />
    </div>
  );
}
export default HistoryGraphsContainer;
