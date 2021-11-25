import React from 'react';
import GraphWithHistory from '../Graph';
import styles from '../../../styles/GraphContainer.module.scss';
import { Context } from '../../../context/interfaces';
import { useStore } from '../../../context/Provider';

function GraphContainer() {
	const { metricsStore, metricToGraph }: Context = useStore();
	const data = metricsStore.metricState;
	const cleanNames = (string: string): string[] => {
		const splitNames: string[] = string.split('_');
		const capitilizeFirstLetter: string[] = splitNames.map((str) => {
			const firstLetter: string = str[0].toUpperCase();
			return `${firstLetter + str.slice(1)} `;
		});
		return capitilizeFirstLetter;
	};
	return (
		<div className={styles.GraphContainer}>
			<GraphWithHistory
				metricValue={data}
				metricName={metricToGraph.metricToGraph}
				title={cleanNames(metricToGraph.metricToGraph)}
				graphType="singular"
			/>
		</div>
	);
}
export default GraphContainer;
