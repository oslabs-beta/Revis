import * as React from 'react';
import {render, fireEvent, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GlobalProvider } from '../../src/context/Provider';
import HomePage from '../../src/pages/index';

describe('testing functionality of homepage',() => {
  
  beforeEach(() => render(
    <GlobalProvider>
      <HomePage />
    </GlobalProvider>));
  afterEach(cleanup);

  describe('testing functionality of login component', () => {
    it('should have a login button', () => {
      const buttonElement = screen.getByText(/login/i);
      expect(buttonElement).toContainHTML('input');
      expect(buttonElement).toBeInTheDocument();
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
  });

  describe('testing functionality of sign up component', () => {
    it('should have a sign up button', () => {
      const buttonElement = screen.getByText(/sign up/i);
      expect(buttonElement).toContainHTML('button');
      expect(buttonElement).toBeInTheDocument();
    });

    it('should render sign up component when button is clicked', () => {
      const buttonElement = screen.getByText(/sign up/i);
      const logoElement = screen.getByText(/revis/i);
      expect(logoElement).toBeInTheDocument();
      fireEvent.click(buttonElement);
      // should re-render the page to have the sign up page 
      const headingElement = screen.getByText('Sign Up');
      expect(headingElement).toBeInTheDocument();
      // revis heading should still be rendered
      expect(logoElement).toBeInTheDocument();
      // button should now be gone
      expect(buttonElement).not.toBeInTheDocument();
    });
  });
  
  describe('testing functionality of forgot password component', () => {
    it('should have a forgot password button', () => {
      const buttonElement = screen.getByText(/forgot password\?/i);
      expect(buttonElement).toContainHTML('button');
      expect(buttonElement).toBeInTheDocument();
    });

    it('should render forgot password component when button is clicked', () => {
      const buttonElement = screen.getByText(/forgot password\?/i);
      const logoElement = screen.getByText(/revis/i);
      expect(logoElement).toBeInTheDocument();
      expect(buttonElement).toContainHTML('button');
      fireEvent.click(buttonElement);
      // should re-render the page to have the password reset page 
      const headingElement = screen.getByText('Password Reset Page');
      expect(headingElement).toBeInTheDocument();
      // revis heading should still be rendered
      expect(logoElement).toBeInTheDocument();
      // button should now be gone
      expect(buttonElement).not.toBeInTheDocument();
    });
  });
});
