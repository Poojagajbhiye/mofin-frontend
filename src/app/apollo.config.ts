import { setContext } from '@apollo/client/link/context';
import { createHttpLink, InMemoryCache, ApolloClient } from '@apollo/client/core';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, context: any) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...(context.headers || {}),
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
