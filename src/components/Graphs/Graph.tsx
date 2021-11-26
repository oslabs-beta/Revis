import React, { useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import PropTypes from 'prop-types';
import styles from '../../styles/Graph.module.scss';
import { GraphComponentProps } from '../../context/interfaces';

function GraphWithHistory({
	metricName,
	metricValue,
	title,
	graphType,
}: GraphComponentProps) {
	const reformattedMetricName = metricName
		.trim()
		.replace(/[' ']/g, '_')
		.toLowerCase();
	const graphWidth = useRef(300);
	const graphHeight = useRef(300);

	if (graphType === 'singular') {
		graphWidth.current = window.innerWidth / 2;
		graphHeight.current = window.innerHeight / 2;
	} else {
		graphWidth.current = window.innerWidth / 4;
		graphHeight.current = window.innerHeight / 4;
	}

	return (
		<div className={styles.CompleteGraphDiv}>
			<h1>{title}</h1>
			<div className={styles.Graph}>
				<LineChart
					width={graphWidth.current}
					height={graphHeight.current}
					data={metricValue}
					margin={{ top: 30, right: 50, bottom: 25, left: 30 }}
				>
					<Line
						type="monotone"
						dataKey={reformattedMetricName}
						stroke="#e38d41e9"
					/>
					<XAxis stroke="#e38d41e9" dataKey="time" tick={{ fill: '#d8d8d4' }} />

					<YAxis
						stroke="#e38d41e9"
						tick={{ fill: '#d8d8d4' }}
						type="number"
						domain={[
							(dataMin) => {
								if (dataMin === 0) return dataMin;
								return Math.floor(0.98 * dataMin);
							},
							(dataMax) => Math.floor(1.01 * dataMax),
						]}
					/>
					<Tooltip />
				</LineChart>
			</div>
		</div>
	);
}
export default GraphWithHistory;

// GraphWithHistory.propTypes = {
//   metricName: PropTypes.string.isRequired,
//   metricValue: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.arrayOf(PropTypes.string),
//   ]).isRequired,
// };
