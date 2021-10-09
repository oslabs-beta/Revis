import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useStore } from '../context/Provider';

function Graph() {
  const { metricsStore }: any = useStore(); 
  console.log(metricsStore.metricState.metricsUpdated);
  // const data = [
  //   {name: 'memory', metric1: 400, metric2: 10, metric3: 2400}, 
  //   {name: 'cache', metric1: 300, metric2: 15, metric3: 2600},
  //   {name: 'etc', metric1: 200, metric2: 20, metric3: 2600},
  //   {name: 'etc2', metric1: 100, metric2: 50, metric3: 2600},

  // ];
  const data = [
    {name: 'metric 1', metric1: 400, metric2: 10, metric3: 2400}, 
    {name: 'metric 1', metric1: 300, metric2: 15, metric3: 2600},
    {name: 'metric 1', metric1: 200, metric2: 20, metric3: 2600},
    {name: 'metric 1', metric1: 100, metric2: 50, metric3: 2600},

  ];
  // <img src="https://i.pinimg.com/originals/2e/e6/99/2ee6998e34c3e2eff7b894c66cfc5267.jpg"></img>
  return (
    <div>
      <LineChart width={600} height={400} data={data}  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="metric1" stroke="#8884d8" />
        <Line type="monotone" dataKey="metric2" stroke="#77EC7F" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
}
export default Graph;
