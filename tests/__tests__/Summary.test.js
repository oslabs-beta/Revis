import React, { useEffect } from 'react';
import { render } from '@testing-library/react'; // virtual dom
import Summary from '../../src/components/Dashboard/Summary';
import { GlobalProvider } from '../../src/context/Provider';

import '@testing-library/jest-dom/extend-expect';
// beforeEach(() =>
//   render(
//     <GlobalProvider>
//       <HomePage />
//     </GlobalProvider>
//   )
// );
// afterEach(cleanup);
test('render the Summary page', () => {
  const component = render(
    <GlobalProvider>
      <Summary />
    </GlobalProvider>
  );
});
