// import React from 'react'
// import {render, fireEvent, screen, cleanup} from '@testing-library/react'
// import '@testing-library/jest-dom'
// import UserLogin from '../components/UserLogin';

// describe('testing functionaity of login component', () => {
//   beforeEach(() => render(<UserLogin />));
//   afterEach(cleanup);

//   it('should have a login button', () => {
//     const buttonElement = screen.getByText(/login/i);
//     expect(buttonElement).toContainHTML('input');
//     expect(buttonElement).toBeInTheDocument();
//   });

//   it('should have a login heading', () => {
//     const headingElement = screen.getByRole('heading');
//     expect(headingElement).toBeInTheDocument();
//   });

//   it('should have an username input field', () => {
//     const inputElement = screen.getByPlaceholderText(/username/i);
//     expect(inputElement).toBeInTheDocument();
//     fireEvent.change(inputElement, { target: { value: 'testing' }});
//     expect(inputElement.value).toBe('testing');
//   });

//   it('should have an password input field', () => {
//     const inputElement = screen.getByPlaceholderText(/password/i);
//     expect(inputElement).toBeInTheDocument();
//     fireEvent.change(inputElement, { target: { value: 'testing' }});
//     expect(inputElement.value).toBe('testing');
//   });

//   // it('should return status of 200 when username and password match', () => {

//   // })
// })
import * as React from 'react';
import {render, fireEvent, screen, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
import user from '@testing-library/user-event';
// import { server, rest } from '../testServer';
import UserLogin from '../components/UserLogin';
import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { GlobalProvider } from '../context/Provider'

// if sticking with fetch
// if (!result.ok) {
//   throw new Error(`Request failed with status code ${result.status}`)
// }
// accepts parameters of which requests to intercept
const server = setupServer(
  // ctx(context) is a parameter that helps build responses
  // rest.post('/api/userLogIn', (req, res, ctx) => {
  //   const { username, password } = req.body;
  //   const data = {
  //     username: 'chao',
  //     password: '123'
  //   }
  //   return res(ctx.status(200), ctx.json({username}))
  //   // if(username === data.username && password === data.password) {
  //   //   return res(ctx.status(200), ctx.json({username}))
  //   // } else return res(ctx.status(500), ctx.json( { error: 'invalid username or password' }));
  // }),
  rest.post('/api/userLogIn', (req, res, ctx) => {
    const { username, password } = req.body;
    const data = {
      username: 'chao',
      password: '123'
    }
    return res(ctx.status(200), ctx.json({username}))
    // if(username === data.username && password === data.password) {
    //   return res(ctx.status(200), ctx.json({username}))
    // } else return res(ctx.status(500), ctx.json( { error: 'invalid username or password' }));
  }),
  // rest.use('*', (req, res, ctx) => {
  //   console.error(`No request handler for ${req.url.toString()}`);
  //   return res(ctx.status(500), ctx.json({ error: 'Please add request handler'}));
  // })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
beforeEach(() => render(
  <GlobalProvider>
    <UserLogin 
      onSignUp={() => console.log('hi')}
      onForgotPassword={() => console.log('forgot password')}
    />
  </GlobalProvider>))
afterEach(() => cleanup());

it('should have status of 200 on successful login', async () => {
  const onChange = jest.fn()
  const buttonElement = screen.getByText(/login/i);
  // expect(buttonElement).toBeInTheDocument();
  // const passwordElement = screen.getByPlaceholderText('password');
  // expect(passwordElement).toBeInTheDocument();
  // const usernameElement = screen.getByPlaceholderText('username');
  // expect(usernameElement).toBeInTheDocument();
  // fireEvent.click(buttonElement, { username: 'chao', password : '123' });
  // fireEvent.change(usernameElement, { target: { value: 'chao' }});
  // fireEvent.change(passwordElement, { target: { value: '123' }});
  user.click(buttonElement);
  // expect(buttonElement).not.toBeInTheDocument();
  // expect(onChange).toHaveBeenCalled();
});

xit('should handle failure', () => {
  server.use(
    rest.post('/api/userLogIn', (req, res, ctx) => {
      return res(ctx.status(404), ctx.json({ error: 'Incorrect username or password. Please try again.' }));
    })
  );
});
