import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
import styles from '../../../styles/GraphContainer.module.scss';
import { useStore } from '../../../context/Provider';
import { Context } from '../../../context/interfaces';
import { on } from 'process';

function MetricsDropdown(props) {
  const { metricsStore }: Context = useStore();
  const { setCurrentMetricFunction } = props;
  const { metricState } = metricsStore;
  const listOfMetrics: [] = [];
  const [buttonMetric, setButtonMetric] = useState('Select Metric');
  useEffect(() => {
    document
      .querySelector(`.${styles.dropdowncontent}`)
      .classList.remove(`${styles.show}`);
  }, [buttonMetric]);

  const cleanNames = (string: string): string[] => {
    const splitNames: string[] = string.split('_');
    const capitilizeFirstLetter: string[] = splitNames.map((str) => {
      const firstLetter: string = str[0].toUpperCase();
      return `${firstLetter + str.slice(1)} `;
    });
    return capitilizeFirstLetter;
  };

  function showingDropdown() {
    document
      .querySelector(`.${styles.dropdowncontent}`)
      .classList.toggle(`${styles.show}`);
  }
  function selectMetric(e) {
    setCurrentMetricFunction(e.target.innerHTML);
    setButtonMetric(e.target.innerHTML);
  }
  if (metricState.length !== 0) {
    Object.entries(metricState[metricState.length - 1]).forEach((el, index) => {
      if (el[0] !== 'time') {
        listOfMetrics.push(
          <button type='button' key={index} onClick={selectMetric}>
            {cleanNames(el[0])}
          </button>
        );
      }
    });
  }
  return (
    <div className={styles.dropdown}>
      <button type='button' id={styles.dropbtn} onClick={showingDropdown}>
        {buttonMetric}
        <FontAwesomeIcon
          icon={faArrowCircleDown}
          className={styles.arrowDown}
        />
      </button>

      <div id={styles.myDropdown} className={styles.dropdowncontent}>
        {listOfMetrics}
      </div>
    </div>
  );
}
export default MetricsDropdown;
