import React, { useContext } from 'react';
import { AppStateContext } from './provider';

export const Home: React.FC = () => {
  const { appState } = useContext(AppStateContext);
  return appState.loggedIn ? <div>Logged In user landing page</div> : <div> Regular landing page</div>;
};
