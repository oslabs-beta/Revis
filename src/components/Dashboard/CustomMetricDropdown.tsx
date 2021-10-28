import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useStore } from '../../context/Provider';
import styles from '../../styles/CustomMetricDropdown.module.scss';

function CustomMetricDropdown(props) {
  const { metricName } = props;
  const [update, setUpdate] = useState(false);
  const [metricOptions, updateOptions] = useState([]);
  const { metricsStore, customMetrics } = useStore();
  const { customMetricState, customMetricDispatch } = customMetrics;
  const { metricState } = metricsStore;

  const cleanNames = (string: string): string[] => {
    const splitNames: string[] = string.split('_');
    const capitilizeFirstLetter: string[] = splitNames.map((str) => {
      const firstLetter: string = str[0].toUpperCase();
      return `${firstLetter + str.slice(1)} `;
    });

    return capitilizeFirstLetter;
  };
  const updateMetrics = (metric: string) => {
    setUpdate(!update);
    if (metric in customMetricState) return;
    customMetricDispatch({
      type: 'changeMetric',
      message: {
        deletedMetric: metricName,
        updatedMetric: metric,
      },
    });
  };
  useEffect(() => {
    if (!metricState) return;
    const removingTime = {...metricState[0]}
    delete removingTime.time;
    updateOptions(Object.keys(removingTime));
  }, [metricState]);

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownBtn} onClick={() => setUpdate(!update)}>
        {metricName}
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
      {update && (
        <div className={styles.dropdownContent}>
          {metricOptions.map((metric) => (
            <div
              onClick={() => {
                updateMetrics(metric);
              }}
              className={styles.dropdownItem}
            >
              {cleanNames(metric)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

CustomMetricDropdown.propTypes = {
  metricName: propTypes.oneOfType([
    propTypes.string,
    propTypes.arrayOf(propTypes.string),
  ]).isRequired,
};

export default CustomMetricDropdown;
