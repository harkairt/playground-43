import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

export const appRouter = t.router({
  currentData: t.procedure.query(() => {
    return {
      timestamp: new Date().toISOString(),
      message: 'Hello from the tRPC server!',
    };
  }),
});

export type AppRouter = typeof appRouter;
