import React from 'react';
import Head from 'next/head';
import MultipleGraphContainer from '../components/Graphs/Multiple/MultipleGraphContainer';
import BackButton from '../components/Globals/BackButton';
import Welcome from '../components/Globals/Welcome';
import UpdateInterval from '../components/Globals/UpdateInterval';

function redisInfo() {
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
      <MultipleGraphContainer />
      <UpdateInterval />
    </div>
  );
}
export default redisInfo;
