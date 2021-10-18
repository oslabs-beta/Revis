import React from 'react';
import GraphContainer from '../components/Graphs/Singular/GraphContainer';
import Welcome from '../components/Globals/Welcome';
import BackButton from '../components/Globals/BackButton';
import UpdateInterval from '../components/Globals/UpdateInterval';

export default function graphs() {
  return (
    <div>
      <BackButton />
      <Welcome />
      <GraphContainer />
      <UpdateInterval />
    
    </div>
  );
}
