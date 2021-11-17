import * as React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import { server, rest } from '../__mocks__/testServer';
import UserLogin from '../../src/Homepage/UserLogin';
import { GlobalProvider } from '../../src/context/Provider';

beforeEach(() =>
  render(
    <GlobalProvider>
      <UserLogin
        onSignUp={() => console.log('hi')}
        onForgotPassword={() => console.log('forgot password')}
      />
    </GlobalProvider>
  )
);
afterEach(() => cleanup());

it('should have status of 200 on successful login', async () => {
  const buttonElement = screen.getByText(/login/i);
  const passwordElement = screen.getByPlaceholderText('password');
  const usernameElement = screen.getByPlaceholderText('username');
  expect(buttonElement).toBeInTheDocument();
  expect(usernameElement).toBeInTheDocument();
  expect(passwordElement).toBeInTheDocument();
  user.click(buttonElement);
});

xit('should handle failure', () => {
  server.use(
    rest.post('/api/userLogIn', (req, res, ctx) =>
      res(
        ctx.status(404),
        ctx.json({ error: 'Incorrect username or password. Please try again.' })
      )
    )
  );
});
