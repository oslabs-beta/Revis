import React from 'react';
import GraphContainer from '../components/GraphContainer';
import Sidebar from '../components/Sidebar';
import Welcome from '../components/Welcome';

export default function graphs() {
  return (
    <div>
      <Welcome />

      <GraphContainer />
    </div>
  );
}
