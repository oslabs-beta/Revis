import React, { useEffect } from 'react';
import Summary from '../../src/components/Dashboard/Summary';
import { render } from "@testing-library/react"; //virtual dom

import "@testing-library/jest-dom/extend-expect";

test("", ()=>{
  const component = render(<Summary/>)
  
})