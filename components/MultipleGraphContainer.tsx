import React, { useEffect } from "react";
import { useStore } from "../context/Provider";
import GridLayout from "react-grid-layout";
import MultipleGraph from "./MultipleGraph";

import LeftMenuOfGraph from "./LeftMenuOfGraph";
import styles from "../styles/GraphContainer.module.scss";
//minW: 4, maxW: 8
const layout = [
  { i: "0", x: 0, y: 0, w: 6, h: 1.2 },
  { i: "1", x: 5, y: 5, w: 6, h: 1.2 },
  { i: "2", x: 0, y: 0, w: 6, h: 1.2 },
  { i: "3", x: 5, y: 5, w: 6, h: 1.2 },
];

function MultipleGraphContainer() {
  const { multipleGraphSelections, metricsStore, metricToGraph } = useStore();
  useEffect(() => {
    async function fetchDataFromRedis() {
      let response = await fetch("http://localhost:3000/api/redis", {
        method: "GET",
      });
      response = await response.json();

      await metricsStore.metricsDispatch({
        type: "updateMetrics",
        message: response,
      });
    }

    const interval = setInterval(() => {
      fetchDataFromRedis();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const data = metricsStore.metricState;
  // const arrayWithGraphs = multipleGraphSelections.multipleGraphState;
  const arrayWithGraphs = multipleGraphSelections.multipleGraphState.map(
    (el, index) => {
      return (
        <div key={index}>
          <MultipleGraph data={data} keys={el} />
        </div>
      );
    }
  );

  return (
    <div className={styles.MultipleGraphContainer}>
      <div>
        <LeftMenuOfGraph />
      </div>
      <div className={styles.GraphFlex}>
        <GridLayout
          layout={layout}
          rowHeight={400}
          width={1200}
          // cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        >
          {arrayWithGraphs}
        </GridLayout>
      </div>
    </div>
  );
}
export default MultipleGraphContainer;


// import { Responsive, WidthProvider } from 'react-grid-layout';

// const ResponsiveGridLayout = WidthProvider(Responsive);

// class MyResponsiveGrid extends React.Component {
//   render() {
//     // {lg: layout1, md: layout2, ...}
//     var layouts = getLayoutsFromSomewhere();
//     return (
//       <ResponsiveGridLayout className="layout" layouts={layouts}
//         breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
//         cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
//         <div key="1">1</div>
//         <div key="2">2</div>
//         <div key="3">3</div>
//       </ResponsiveGridLayout>
//     )
//   }
// }
