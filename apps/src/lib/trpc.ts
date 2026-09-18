import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { Platform } from 'react-native';
import type { AppRouter } from '@server/router';

function getBaseUrl() {
  if (Platform.OS === 'web') {
    return '';
  }
  const envUrl = process.env.EXPO_PUBLIC_API_URL;
  if (envUrl) {
    return envUrl;
  }
  return 'http://localhost:8081';
}

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});
