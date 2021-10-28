import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import saddog from './saddog.jpg';
import styles from '../styles/LandingPage.module.scss';

function Four04() {
  return (
    <div className={styles.invalidPage}>
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
      <h1>404 error</h1>
      <h2>Oh no! Page not found</h2>
      <Image
        src={saddog}
        alt="Page failed loading puppy"
        height="400px"
        width="400px"
      />
    </div>
  );
}

export default Four04;
