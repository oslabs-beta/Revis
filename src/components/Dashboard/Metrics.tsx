import React, { ReactElement, useState } from 'react';
import propTypes from 'prop-types';
import { useStore } from '../../context/Provider';
import styles from '../../styles/Summary.module.scss';
import { Context, MetricsProps } from '../../context/interfaces';
import Tooltip from './Tooltip';
import CustomMetricDropdown from './CustomMetricDropdown';
import { cleanNames } from '../../functions/globalFunctions';
import { UPDATE_SELECTED_METRIC } from '../../context/constants/actionTypes';

export default function Metrics(props: MetricsProps): ReactElement {
  const { metricName, metricValue, changeCurrentRender }: MetricsProps = props;
  const { metricToGraph }: Context = useStore();
  const [dropdownState, setDropdownState] = useState(false);

  return (
    <div className={styles.metrics}>
      <div className={styles.metricsAndTooltip}>
        <CustomMetricDropdown
          metricName={cleanNames(metricName)}
          setDropdownState={setDropdownState}
        />
      </div>
      <Tooltip metric={metricName} dropdownState={dropdownState} />
      <button
        type="button"
        onClick={(): void => {
          metricToGraph.selectedMetricDispatch({
            type: UPDATE_SELECTED_METRIC,
            message: metricName,
          });
          changeCurrentRender('Single graph');
        }}
      >
        {metricValue}
      </button>
    </div>
  );
}

Metrics.propTypes = {
  metricName: propTypes.oneOfType([
    propTypes.string,
    propTypes.arrayOf(propTypes.string),
  ]).isRequired,
  metricValue: propTypes.oneOfType([
    propTypes.string,
    propTypes.arrayOf(propTypes.string),
  ]).isRequired,
};
