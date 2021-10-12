import React, { useState, useEffect } from "react";
import { useStore } from "../context/Provider";

function MetricsForGraph(props) {
  const { multipleGraphSelections } = useStore();
  const { keys } = props;

  useEffect(() => {
    if (multipleGraphSelections.multipleGraphState.includes(keys)) {
      const checkbox = document.getElementById(`${keys}`);
      checkbox.setAttribute("checked", "true");
    }
  });

  const updateMetric = () => {
    const checkbox = document.getElementById(`${keys}`);
    if (multipleGraphSelections.multipleGraphState.length >= 4) {
      return alert("Only 4 graphs can be shown simultaneously");
    }
    if (checkbox.getAttribute("checked")) {
      multipleGraphSelections.multipleGraphDispatch({
        type: "metricUnselected",
        message: keys,
      });
      checkbox.setAttribute("checked", "false");
    } else {
      multipleGraphSelections.multipleGraphDispatch({
        type: "newMetricSelected",
        message: keys,
      });

      checkbox.setAttribute("checked", "true");
    }
  };

  return (
    <div>
      <input id={keys} type="checkbox" onClick={updateMetric}></input>
      {keys}
    </div>
  );
}

export default MetricsForGraph;

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

{
  /* <button type="button" onClick={() => (checked = !checked)}>
        check
      </button> */
}
