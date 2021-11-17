import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Backbutton from '../../src/components/Globals/BackButton';

describe('testing functionality of back button', () => {
  beforeEach(() => render(<Backbutton />));
  afterEach(cleanup);

  it('should return to dashboard on click', () => {
    const backButton = screen.getAllByText(/Back/i);
    fireEvent.click(backButton);
  });
});
