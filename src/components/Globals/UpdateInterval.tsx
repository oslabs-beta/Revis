import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/Provider';
import styles from '../../styles/UpdateInterval.module.scss';
import { Context, Metrics } from '../../context/interfaces';

function UpdateInterval() {
  const { metricsStore, graphInterval, currentServer }: Context = useStore();
  const time = graphInterval.updateInterval.interval;
  const placeholder = graphInterval.updateInterval.interval / 1000;
  const { selectedServer } = currentServer;
  const { endpoint, password, port } = selectedServer;
  const [render, reRender] = useState(false);
  const { metricState, metricsDispatch } = metricsStore;

  async function fetchDataFromRedis() {
    const response = await fetch('/api/redis', {
      method: 'POST',
      body: JSON.stringify({
        endpoint: `${endpoint}`,
        password: `${password}`,
        port: `${port}`,
      }),
    });
    const updatedMetrics: Metrics = await response.json();
    metricsDispatch({
      type: 'updateMetrics',
      message: updatedMetrics,
    });
  }

  useEffect(() => {
    if (endpoint === '' || password === '' || port === '') return;

    if (selectedServer.name !== undefined) {
      const interval = setInterval(fetchDataFromRedis, time);

      if (graphInterval.updateInterval.update === false)
        clearInterval(interval);
      return () => {
        clearInterval(interval);
      };
    }
  }, [selectedServer, render]);

  const change = () => {
    graphInterval.updateIntervalDispatch({
      type: 'toggleInterval',
      message: !graphInterval.updateInterval.update,
    });
    reRender(!render);
  };
  const updateInterval = () => {
    const newInterval = document.getElementById('intervalInput');
    graphInterval.updateIntervalDispatch({
      type: 'updateInterval',
      message: newInterval.value,
    });
    newInterval.value = '';
    reRender(!render);
  };
  return (
    <div id="intervalMenu" className={styles.underDashboard}>
      <div className={styles.textAndSwitch}>
        <div className={styles.intervalInput}>
          Update interval in seconds:
          <input
            id="intervalInput"
            type="number"
            placeholder={placeholder}
          ></input>
          <button type="button" onClick={updateInterval}>
            Update
          </button>
        </div>
        <label className={styles.switch}>
          <input
            checked={graphInterval.updateInterval.update}
            type="checkbox"
            onChange={change}
          ></input>
          <span className={styles.slider}></span>
        </label>
        <p>Automatic Updates</p>
      </div>
    </div>
  );
}

export default UpdateInterval;
