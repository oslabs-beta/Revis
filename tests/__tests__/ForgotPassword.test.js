import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ForgotPassword from '../../src/components/Homepage/ForgotPassword';
import { GlobalProvider } from '../../src/context/Provider';

describe('testing functionality of forgot password component', () => {
  const backButtonMock = jest.fn(() => null);
  beforeEach(() =>
    render(
      <GlobalProvider>
        <ForgotPassword previousPage={backButtonMock} />
      </GlobalProvider>
    )
  );
  afterEach(cleanup);

  it('should have the forgot password heading', () => {
    const headingElement = screen.getByRole('heading');
    expect(headingElement).toHaveTextContent('Password Reset');
    expect(headingElement).toContainHTML('h1');
  });

  it('should have an input field for email', () => {
    const inputElement = document.querySelector('.userInput');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toContainHTML('input');
    fireEvent.change(inputElement, { target: { value: 'testing' } });
    expect(inputElement.value).toBe('testing');
  });

  it('should have a submit button', () => {
    const buttonElement = screen.getByText(/submit/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Submit');
  });

  it('should have a back button', () => {
    const buttonElement = screen.getByText(/back/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toContainHTML('button');
  });
});
