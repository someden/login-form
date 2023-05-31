import { setupWorker, rest } from 'msw';

const apiPath = '/api/v1';

const loginPath = () => [apiPath, 'login'].join('/');

export default {
  loginPath,
};

const worker = setupWorker(
  rest.post(loginPath(), async (req, res, ctx) => {
    const { password } = await req.json();

    if (password === 'wrong') {
      return res(ctx.delay(2000), ctx.status(401), ctx.json({ message: 'Invalid email or password' }));
    }

    return res(ctx.delay(2000), ctx.json({ token: '123ABC' }));
  })
);

worker.start();
