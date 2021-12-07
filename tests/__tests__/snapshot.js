// __tests__/snapshot.js
import React from 'react';
import renderer from 'react-test-renderer';
import Index from '../../src/pages/index';

xit('renders homepage unchanged', () => {
  const tree = renderer.create(<Index />).toJSON();
  expect(tree).toMatchSnapshot();
});
