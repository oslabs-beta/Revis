import React from 'react';
import { useTheme } from 'next-themes';
import styles from '../styles/DarkModeToggleSwitch.module.scss';

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <label className={styles.switch}>
        <input
          type="checkbox"
          id="darkMode"
          defaultChecked={theme !== 'light'}
          onClick={() => {
            setTheme(theme === 'light' ? 'dark' : 'light');
          }}
        ></input>
        <span className={styles.slider}></span>
      </label>
    </div>
  );
}
