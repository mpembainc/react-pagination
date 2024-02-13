import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostPage from './pages/PostPage';

const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <PostPage />
    </QueryClientProvider>
  );
};

export default App;
