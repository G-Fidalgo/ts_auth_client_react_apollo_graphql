import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache, Observable } from '@apollo/client';
import { onError } from '@apollo/link-error';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import JwtDecode from 'jwt-decode';
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
      new TokenRefreshLink({
        accessTokenField: 'access_token',
        isTokenValidOrUndefined: () => {
          const token = appGetAuthToken();
          if (token.length === 0) return true;
          try {
            const { exp }: any = JwtDecode(token);
            return Date.now() < exp * 1000;
          } catch {
            return false;
          }
        },
        fetchAccessToken,
        handleFetch: (accessToken) => {
          console.log(`handleFetch: ${accessToken}`);
          appSetAuthToken(accessToken);
        },
        handleResponse: (operation, accessTokenField) => {
          console.log(`handleResponse: ${accessTokenField}`);
          console.log(operation);
        },
        handleError: (err) => {
          console.log(`handleError: ${err}`);
          appSetLogOut();
        }
      }),
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

export const fetchAccessToken = async (): Promise<any> => {
  // operationName is the name of graphql request and it should match the one given on query
  const payload = {
    operationName: 'Refresh',
    variables: {},
    query: 'mutation Refresh {\n refresh {\n access_token\n __typename\n}\n}\n'
  };
  // prettier-ignore
  return fetch('http://localhost:4000/graphql', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': "application/json; charset=utf-8",
      'Accept': "application/json",
    }
  })
  .then(async (res)=> {
    const response = await res.json();
    console.log('fetchAccessToken');
    console.log(response.data.refresh);
    return response.data.refresh;
  })
};
