import React from 'react';
import PropTypes from 'prop-types';
import Server from './Server';
import styles from '../../../styles/ServerList.module.scss';
import {
	ServerInterface,
	ServerListComponentProps,
} from '../../../context/interfaces';

export default function ServerList(props: ServerListComponentProps) {
	const { serverList, currentDivHover, changeDivHover } = props;

	const servers = serverList.map((server: ServerInterface) => (
		<Server
			key={server.name}
			name={server.name}
			endpoint={server.endpoint}
			port={server.port}
			currentDivHover={currentDivHover}
			changeDivHover={changeDivHover}
		/>
	));

	return <div className={styles.serverList}>{servers}</div>;
}

ServerList.defaultProps = {
	currentDivHover: null,
};

ServerList.propTypes = {
	serverList: PropTypes.arrayOf(
		PropTypes.objectOf(
			PropTypes.shape({
				name: PropTypes.string,
				endpoint: PropTypes.string,
				port: PropTypes.string,
			})
		)
	).isRequired,
	currentDivHover: PropTypes.instanceOf(<div></div>),
	changeDivHover: PropTypes.func.isRequired,
};
