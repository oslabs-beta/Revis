import React from 'react'
import {render, fireEvent, screen, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import UserLogin from '../components/UserLogin';

describe('testing functionaity of login component', () => {
  beforeEach(() => render(<UserLogin />));
  afterEach(cleanup);

  it('should have a login button', () => {
    const buttonElement = screen.getByText(/login/i);
    expect(buttonElement).toContainHTML('input');
    expect(buttonElement).toBeInTheDocument();
  });

  it('should have a login heading', () => {
    const headingElement = screen.getByRole('heading');
    expect(headingElement).toBeInTheDocument();
  });
  // it('should return status of 200 when ')
})
