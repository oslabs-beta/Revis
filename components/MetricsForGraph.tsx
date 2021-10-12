import React, { useState, useEffect } from "react";
import { useStore } from "../context/Provider";
import styles from "../styles/GraphContainer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-solid-svg-icons";

function MetricsForGraph(props) {
  const { multipleGraphSelections } = useStore();
  const [test,changeTest]= useState(false);
  const { keys } = props;
  // let checked = false;
  // const changeMetric = () => {
  //   if (multipleGraphSelections.multipleGraphState.length >= 4) return alert('Only 4 graphs can be simultaneously shown');
  //   if (multipleGraphSelections.multipleGraphState[keys]) {
  //     multipleGraphSelections.multipleGraphDispatch({
  //       type: "metricUnselected",
  //       message: keys,
  //     });
  //   } else {
  //     multipleGraphSelections.multipleGraphDispatch({
  //       type: "newMetricSelected",
  //       message: keys,
  //     });
  //   };
  // }

  const squareUnChecked = (
    <span onClick={changeTest(!test)} key={keys}>
      <FontAwesomeIcon
        id={keys}
        icon={faSquare}
        className={styles.emptySquare}
      />
    </span>
  );
  const squareChecked = (
    <span onClick={changeTest(!test)} key={keys}>
      <FontAwesomeIcon id={keys} icon={faCheckSquare} />
    </span>
  );

  // useEffect(() => {
  //   if (multipleGraphSelections.multipleGraphState[keys]) {
  //     // const checkbox = document.getElementById(`${keys}`);
  //     // checkbox.setAttribute("checked", "true");
  //   }
  // );

  // const updateMetric = () => {
  //   const checkbox = document.getElementById(`${keys}`);

  //   if (checkbox.getAttribute("checked")) {
  //     multipleGraphSelections.multipleGraphDispatch({
  //       type: "metricUnselected",
  //       message: keys,
  //     });
  //     checkbox.removeAttribute("checked");
  //   } else {
  //     multipleGraphSelections.multipleGraphDispatch({
  //       type: "newMetricSelected",
  //       message: keys,
  //     });

  //     if (multipleGraphSelections.multipleGraphState.length >= 4) {
  //       checkbox.removeAttribute("checked");
  //     } else checkbox.setAttribute("checked", "true");
  //   }
  // };

  return (
    <div>
      {test ? squareUnChecked : squareChecked}
      {keys}
    </div>
  );
}



// componentDidMount() {
//   if (multipleGraphSelections.multipleGraphState.includes(keys)) {
//     // const checkbox = document.querySelector(`#${keys}`);
//     const checkbox = document.getElementById(`${keys}`);
//     checkbox.setAttribute("checked", true);
//   }
// }

// console.log(multipleGraphSelections.multipleGraphState)
// if (multipleGraphSelections.multipleGraphState.includes(keys)) {
//   // const checkbox = document.querySelector(`#${keys}`);
//   const checkbox = document.getElementById(`${keys}`);
//   checkbox.setAttribute("checked", true);
// }
// console.log(multipleGraphSelections.multipleGraphState.includes(keys));
// if keys is in the global state then useState is set to true\
//

// {
  /* <button type="button" onClick={() => (checked = !checked)}>
        check
      </button> */
// }

export default MetricsForGraph;
