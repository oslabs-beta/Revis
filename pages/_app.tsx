import React from 'react';
import { GlobalProvider } from '../context/Provider';
import '../styles/globals.scss';
import DarkModeToggle from '../components/DarkModeToggle';

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <DarkModeToggle />
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default MyApp;
