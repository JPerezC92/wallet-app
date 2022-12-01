import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function queryClientWrapper(): React.FC<{
  children: React.ReactElement;
}> {
  const queryClient = new QueryClient();

  return function QueryClientWrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}
