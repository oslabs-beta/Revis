import React from 'react';
import Head from 'next/head';
import GraphContainer from '../components/Graphs/Singular/GraphContainer';
import Welcome from '../components/Globals/Welcome';
import BackButton from '../components/Globals/BackButton';
import UpdateInterval from '../components/Globals/UpdateInterval';

export default function graphs() {
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
      <BackButton />
      <Welcome />
      <GraphContainer />
      <UpdateInterval />
    </div>
  );
}
