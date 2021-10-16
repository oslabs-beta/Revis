import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// if sticking with fetch
// if (!result.ok) {
//   throw new Error(`Request failed with status code ${result.status}`)
// }
// accepts parameters of which requests to intercept
const server = setupServer(
  // ctx(context) is a parameter that helps build responses
  rest.post('/api/userLogIn', (req, res, ctx) => {
    const { username, password } = req.body;
    const data = {
      username: 'chao',
      password: '123'
    }
    if(username === data.username && password === data.password) {
      return res(ctx.status(200), ctx.json({data}))
    } else return res(ctx.status(500), ctx.json( { error: 'invalid username or password' }));
  }),
  // rest.use('*', (req, res, ctx) => {
  //   console.error(`No request handler for ${req.url.toString()}`);
  //   return res(ctx.status(500), ctx.json({ error: 'Please add request handler'}));
  // })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, rest }