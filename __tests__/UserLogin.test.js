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

  it('should have an username input field', () => {
    const inputElement = screen.getByPlaceholderText(/username/i);
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: 'testing' }});
    expect(inputElement.value).toBe('testing');
  });

  it('should have an password input field', () => {
    const inputElement = screen.getByPlaceholderText(/password/i);
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: 'testing' }});
    expect(inputElement.value).toBe('testing');
  });
  
  // it('should return status of 200 when username and password match', () => {

  // })
})
