import React from 'react';
import Head from 'next/head';
import Download from '../components/StaticPages/Download';

function download() {
  return (
    <div>
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
      <Download />
    </div>
  );
}

export default download;
