import React, { useState, useEffect} from 'react';
import { useStore } from '../context/Provider';
import styles from '../styles/UpdateInterval.module.scss';

function UpdateInterval() {
  // const { graphInterval } = useStore();

  const { metricsStore, metricToGraph, graphInterval } = useStore();
  // console.log(graphInterval.updateInterval)
  const time = graphInterval.updateInterval.interval;
  const placeholder = graphInterval.updateInterval.interval / 1000;
  const [render, reRender] = useState(false);
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
    // fetchDataFromRedis();
    const interval = setInterval(fetchDataFromRedis, time);
    if (graphInterval.updateInterval.update === false) clearInterval(interval);
    return () => clearInterval(interval);
  }, [render]);

  const change = () => {
    graphInterval.updateIntervalDispatch({
      type: 'toggleInterval',
      message: !graphInterval.updateInterval.update,
    })
    reRender(!render);
  }
  const updateInterval = () => {
    const newInterval = document.getElementById('intervalInput');
    graphInterval.updateIntervalDispatch({
      type: 'updateInterval',
      message: newInterval.value,
    })
    newInterval.value = '';
    reRender(!render);
  }
  return (
    <div>
      <div>
        Enable/Disable automatic Updates
        <label className={styles.switch}>
          <input 
            checked={graphInterval.updateInterval.update}
            type="checkbox"
            onChange={change}
          ></input>
          <span className={styles.slider}></span>
        </label>
      </div>
      Update interval in seconds:
      <input
        id="intervalInput"
        type="number"
        placeholder={placeholder}
        ></input>
      <button 
        type="button"
        onClick={updateInterval}>
          Update
      </button>
    </div>
  )
}

export default UpdateInterval;