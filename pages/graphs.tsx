import React from 'react';
import GraphContainer from '../components/GraphContainer';
import Welcome from '../components/Welcome';
import BackButton from '../components/BackButton';
import UpdateInterval from '../components/UpdateInterval';

export default function graphs() {
  return (
    <div>
      <BackButton />
      <Welcome />
      <GraphContainer />
      {/* <UpdateInterval /> */}
    </div>
  );
}
