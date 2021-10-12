import React from 'react';
import { ThemeProvider } from 'next-themes';
import { GlobalProvider } from '../context/Provider';
import '../styles/globals.scss';
import DarkModeToggle from '../components/DarkModeToggle';

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <ThemeProvider enableSystem={false}>
        <DarkModeToggle />
        <Component {...pageProps} />
      </ThemeProvider>
    </GlobalProvider>
  );
}

export default MyApp;
