import React from 'react';
import styles from '../../../styles/HistoryGraphsContainer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
import { useStore } from '../../../context/Provider';
import { Context } from '../../../context/interfaces';

function MetricsDropdown(props) {
  const { metricsStore }: Context = useStore();
  const {setCurrentMetricFunction} = props;
  const { metricState } = metricsStore;
  const list = [];

  const cleanNames = (string: string): string[] => {
    const splitNames: string[] = string.split('_');
    const capitilizeFirstLetter: string[] = splitNames.map((str) => {
      const firstLetter: string = str[0].toUpperCase();
      return firstLetter + str.slice(1) + ' ';
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

    //this is going to be used to fetch the metric and date from the global state and create the array we need to have the graph
    //the graph needs to initialize with just one line using the same logic of single graph but we need to pass other lines
  }

  Object.entries(metricState[metricState.length - 1]).forEach((el) => {
    list.push(
      <button type='button' onClick={selectMetric}>
        {cleanNames(el[0])}
      </button>
    );
  });
  return (
    <div className={styles.dropdown}>
      <button type='button' id={styles.dropbtn} onClick={showingDropdown}>
        Select metric
        <FontAwesomeIcon
          icon={faArrowCircleDown}
          className={styles.arrowDown}
        />
      </button>

      <div id={styles.myDropdown} className={styles.dropdowncontent}>
        {list}
      </div>
    </div>
  );
}
export default MetricsDropdown;
