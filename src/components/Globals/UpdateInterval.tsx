import React, { useState, useEffect } from 'react';
import router from 'next/router';
import { useStore } from '../../context/Provider';
import styles from '../../styles/UpdateInterval.module.scss';
import { Context } from '../../context/interfaces';

function UpdateInterval() {
  const { metricsStore, graphInterval, currentServer }: Context = useStore();
  const time = graphInterval.updateInterval.interval;
  const placeholder = graphInterval.updateInterval.interval / 1000;
  const { selectedServer } = currentServer;
  const { endpoint, password, port } = selectedServer;
  const [render, reRender] = useState(false);
  const { metricsDispatch } = metricsStore;

  useEffect(() => {
    if (selectedServer.name === '') return;
    async function fetchDataFromRedis() {
      const response = await fetch('/api/redis', {
        method: 'POST',
        body: JSON.stringify({
          endpoint: `${endpoint}`,
          password: `${password}`,
          port: `${port}`,
        }),
      });
      const updatedMetrics: string[] = await response.json();
      metricsDispatch({
        type: 'updateMetrics',
        message: updatedMetrics,
      });
    }
    if (selectedServer.name !== undefined) {
      fetchDataFromRedis();
      const interval = setInterval(fetchDataFromRedis, time);
      if (graphInterval.updateInterval.update === false)
        clearInterval(interval);
      return () => clearInterval(interval);
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
    <div className={styles.underDashboard}>
      <button type="button" onClick={() => router.replace('/redisinfo')}>
        Go to graphs
      </button>
      <div className={styles.textAndSwitch}>
        <label className={styles.switch}>
          <input
            checked={graphInterval.updateInterval.update}
            type="checkbox"
            onChange={change}
          ></input>
          <span className={styles.slider}></span>
        </label>
        <p>Enable/Disable automatic Updates</p>
      </div>
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
    </div>
  );
}

export default UpdateInterval;
