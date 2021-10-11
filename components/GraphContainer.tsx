import React from "react";
import GridLayout from "react-grid-layout";
import Graph from "../components/Graph";

import BackButton from "../components/BackButton";
import LeftMenuOfGraph from "./LeftMenuOfGraph";
import styles from "../styles/GraphContainer.module.scss";
// import '../node_modules/react-grid-layout/css/styles.css';
// import '../node_modules/react-resizable/css/styles.css';
// minW: 900, maxW: 900
const layout = [
  { i: "a", x: 1, y: 1, w: 1, h: 1 },
  { i: "b", x: 1, y: 1, w: 1, h: 1 },
  { i: "c", x: 1, y: 1, w: 1, h: 1 },
];
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

function GraphContainer() {
  return (
    <div className={styles.GraphContainer}>
 
      <div>
        <BackButton />
        <LeftMenuOfGraph />
      </div>
      <div className={styles.GraphFlex}>
     
        <GridLayout
          className="layout"
          layout={layout}
          rowHeight={400}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        >
          <div key="a" style={{ padding: "70px 0 0 37%" }}>
            <Graph />
          </div>
          <div key="b" style={{ padding: "600px 0 0 37%" }}>
            <Graph />
          </div>
          <div key="c" style={{ padding: "1100px 0 0 37%" }}>
            <Graph />
          </div>
        </GridLayout>
      </div>
    </div>
  );
}
export default GraphContainer;
