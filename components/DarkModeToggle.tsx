import React from 'react';
import { useStore } from '../context/Provider';
import styles from '../styles/DarkModeToggleSwitch.module.scss';

export default function DarkModeToggle() {
  const { theme }: { currentTheme: boolean; themeDispatch: Function } =
    useStore();

  return (
    <div>
      <label className={styles.switch}>
        <input
          type="checkbox"
          id="darkMode"
          onClick={() =>
            theme.themeDispatch({
              type: 'changeStatus',
              message: theme.currentTheme.light,
            })
          }
        ></input>
        <span className={styles.slider}></span>
      </label>
    </div>
  );
}
