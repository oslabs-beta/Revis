import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import {faCircle} from "@fortawesome/free-solid-svg-icons";

function MetricsForGraph(props) {
    const {keys} = props;
    const [isChecked, checked] = useState(false);
    return (
        <div>
            <span onClick={() => checked( isChecked === false ? true : false)}>
            {keys}  
            {isChecked ? <FontAwesomeIcon icon={faCheckCircle} /> : <FontAwesomeIcon icon={faCircle} />}  
            
            </span>
        </div>
       
    )
}

export default MetricsForGraph;