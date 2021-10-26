import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
    updateOptions(Object.keys(metricState[0]));
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
              {metric}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

CustomMetricDropdown.propTypes = {
  metricName: PropTypes.string.isRequired,
};

export default CustomMetricDropdown;
