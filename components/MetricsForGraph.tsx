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

  return (
    <div>
      <input
        id={keys}
        type="checkbox"
        // onClick={() => /*if check is true, then remove the element from the global state, if it's false add it to the array*/}
      ></input>
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
