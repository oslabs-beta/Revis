import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Graph from '../../src/components/Graphs/Graph';
import useStore from '../../src/context/hooks/useStore';

xdescribe('testing functionality of Graph component', () => {
  // const { metricsStore } = useStore();
  // const dispatchMock = jest.spyOn(metricsStore.metricsDispatch, 'useDispatch');
  beforeEach(() =>
    // dispatchMock.mockClear();
    render(
      <GlobalProvider>
        <Graph />
      </GlobalProvider>
    )
  );
  afterEach(cleanup);
  it('should have a title', () => {
    const headingElement = screen.getByRole('heading');
    expect(headingElement).toContainHTML('h1');
  });
  it('should have a graph', () => {
    const atLeastOneMetric = screen.getByText('0');
    expect(atLeastOneMetric).toBeInTheDocument();
  });
  // it('it should display data given by state', () => {
  //   metricsStore.metricsDispatch({
  //     type: 'updateMetrics',
  //     message: { metric1: '1', metric2: '2', metric3: '3' },
  //   });
  //   const firstMetric = screen.getByText('1');
  //   expect(firstMetric).toBeInTheDocument();
  // });
});
