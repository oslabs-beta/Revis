import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useStore } from '../../context/Provider';
import styles from '../../styles/CustomMetricDropdown.module.scss';
import { CHANGE_METRIC } from '../../context/constants/actionTypes';

function CustomMetricDropdown(props) {
	const { metricName, setDropdownState } = props;
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
			type: CHANGE_METRIC,
			message: {
				deletedMetric: metricName,
				updatedMetric: metric,
			},
		});
	};
	useEffect(() => {
		if (!metricState) return;
		setDropdownState(false);
		const removingTime = { ...metricState[0] };
		delete removingTime.time;
		updateOptions(Object.keys(removingTime));
	}, [metricState]);

	function settingUpdate() {
		setDropdownState(update);
		setUpdate(!update);
	}

	return (
		<div className={styles.dropdown}>
			<div className={styles.dropdownBtn} onClick={settingUpdate}>
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
	setDropdownState: propTypes.func.isRequired,
};

export default CustomMetricDropdown;
