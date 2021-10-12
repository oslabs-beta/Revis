import React from "react";
import { useStore } from "../context/Provider";
import GridLayout from "react-grid-layout";
import MultipleGraph from "./MultipleGraph";

import LeftMenuOfGraph from "./LeftMenuOfGraph";
import styles from "../styles/GraphContainer.module.scss";
//minW: 4, maxW: 8
const layout = [
  { i: "0", x: 0, y: 0, w: 6, h: 1.2 },
  { i: "1", x: 10, y: 1, w: 6, h: 1.2 },
  { i: "2", x: 0, y: 2, w: 6, h: 1.2 },
  { i: "3", x: 10, y: 1, w: 6, h: 1.2 },
];

function MultipleGraphContainer() {
  const { multipleGraphSelections } = useStore();
  // const arrayWithGraphs = multipleGraphSelections.multipleGraphState;
  const arrayWithGraphs = multipleGraphSelections.multipleGraphState.map((el,index)=>{
    <div key={index.toString()}>
    <MultipleGraph keys={el}/>
  </div>
  })

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
          {/* <div key="a" style={{ padding: "70px 0 0 37%" }}>
          <div key="0">
            <Graph />
          </div>
          {/* <div key="b" style={{ padding: "600px 0 0 37%" }}> */}
          {/* <div key="1">
            <Graph />
          </div>
          <div key="2">
            {/* <div key="c" style={{ padding: "1100px 0 0 37%" }}> */}
            {/* <Graph />
          </div>
          <div key="3"> */}
            {/* <div key="c" style={{ padding: "1100px 0 0 37%" }}> */}
            {/* <Graph />
          </div> */} */} */}
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
