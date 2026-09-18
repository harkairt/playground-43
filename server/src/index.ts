import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';
import { appRouter } from './router.js';

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
});

server.listen(3000, () => {
  console.log('tRPC server listening on http://localhost:3000');
});
