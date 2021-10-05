import React from 'react'
import {render, fireEvent, screen, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import HomePage from '../pages/index';

describe('testing functionality of homepage',() => {
  
  beforeEach(() => render(<HomePage />));
  afterEach(cleanup);

  describe('testing functionality of login component', () => {
    xit('should have a login button', () => {
      const buttonElement = screen.getByText(/login/i);
      expect(buttonElement).toContainHTML('button');
  });
  });

  describe('testing functionality of sign up component', () => {
    it('should have a sign up button', () => {
      const buttonElement = screen.getByText(/signup/i);
      expect(buttonElement).toContainHTML('button');
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
  
    // xit('should render sign up component when button is clicked', () => {
    //   const 
    // })
  });
  
  describe('testing functionality of forgot password component', () => {
    it('should have a forgot password button', () => {
      const buttonElement = screen.getByText(/forgot password\?/i);
      expect(buttonElement).toContainHTML('button');
      // expect(buttonElement).
    });

    xit('should render forgot password component when button is clicked', () => {
      // const buttonpElement = screen.getByText(/forgot password\?/i);
      const buttonElement = screen.getByTestId('pwbutton');
      fireEvent.click(buttonElement);
      const headingElement = screen.getByText('Password Reset Page');
      const logoElement = screen.getByText('Revis');
      expect(headingElement).toHaveTextContent('Password Reset Page');
      expect(logoElement).toHaveTextContent('Revis');
    });
  })

});
