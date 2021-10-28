import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { GlobalProvider } from '../context/Provider';
import '../styles/globals.scss';
import DarkModeToggle from '../components/Globals/DarkModeToggle';

function MyApp({ Component, pageProps }) {
  return (
    <div className="general">
      <Head>
        <title> Revis - Redis Performance Visualization Tool</title>
        <meta
          name="keywords"
          content="HTML, CSS, JavaScript, Redis, caching, optimization, tools, visualization, visualizer, visual, performance, improvement"
        ></meta>
        <meta
          name="description"
          content="Redis performance enhancer visualization tool"
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta
          name="author"
          content="Liam Fontes, Mercedes Kalaizic, Chao Yu, Jason Zeng"
        ></meta>
      </Head>
      <GlobalProvider>
        <ThemeProvider enableSystem={false}>
          <DarkModeToggle />
          <Component {...pageProps} />
        </ThemeProvider>
      </GlobalProvider>
    </div>
  );
}

export default MyApp;
