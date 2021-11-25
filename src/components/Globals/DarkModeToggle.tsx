import React from 'react';
import { useTheme } from 'next-themes';
import styles from '../../styles/DarkModeToggleSwitch.module.scss';

export default function DarkModeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<label className={styles.switch}>
			<input
				type="checkbox"
				id="darkMode"
				defaultChecked={theme !== 'light'}
				onClick={() => {
					setTheme(theme === 'light' ? 'dark' : 'light');
				}}
				style={{ backgroundImage: `url${'./moon-solid.svg'}` }}
			></input>
			<span className={styles.slider}></span>
		</label>
	);
}
