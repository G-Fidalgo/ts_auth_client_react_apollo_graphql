import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache, Observable } from '@apollo/client';
import { onError } from '@apollo/link-error';
import React, { createContext, useState, ReactNode } from 'react';

let authToken = '';
const inital = {
  appState: { loggedIn: false },
  gqlError: { msg: '' },
  appSetLogin: (token: string) => {},
  appSetLogOut: () => {},
  appSetAuthToken: (token: string) => {},
  appClearAuthToken: () => {}
};

export const AppStateContext = createContext(inital);

// Gives access to children components to App State Context
function AppStateProvider({ children }: { children: ReactNode }) {
  const [appState, setAppState] = useState({ loggedIn: false });
  const [gqlError, setGQLError] = useState({ msg: '' });

  const appSetLogin = (token: string) => {
    authToken = token;
    setAppState({ ...appState, loggedIn: true });
  };

  const appSetLogOut = () => {
    authToken = '';
    setAppState({ ...appState, loggedIn: false });
  };

  const appSetAuthToken = (token: string) => {
    authToken = token;
  };
  const appClearAuthToken = () => {
    authToken = '';
  };
  const appGetAuthToken = () => {
    return authToken;
  };

  // apollo cache
  const cache = new InMemoryCache({});

  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable((observer) => {
        let handle: any;
        Promise.resolve(operation)
          .then((operation) => {
            operation.setContext({ headers: { authorization: `Bearer ${appGetAuthToken()}` } });
          })
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer)
            });
          })
          .catch(observer.error.bind(observer));
        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );

  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors === undefined || graphQLErrors[0].path === undefined) return;
        if (graphQLErrors[0].path[0] === 'refresh') return;
        const err = graphQLErrors[0].message;
        setGQLError({ msg: err });
      }),
      requestLink,
      new HttpLink({
        uri: 'http://localhost:4000/graphql',
        credentials: 'include'
      })
    ]),
    cache
  });

  return (
    <AppStateContext.Provider
      value={{
        appState,
        gqlError,
        appSetLogin,
        appSetLogOut,
        appSetAuthToken,
        appClearAuthToken
      }}
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </AppStateContext.Provider>
  );
}

export default AppStateProvider;
