import React from 'react';
import { useProfileQuery } from '../gql/generated/graphql';
import { useHistory } from 'react-router-dom';

export const Profile: React.FC = () => {
  // We'll navigate to Home page if profile request fails
  const history = useHistory();

  /*data is the info from the request, loading and error to manage those
   * network policy: every time we hit this page we are going to make a request to the server, for testing purposes in order to check
   * automatic refresh
   */
  const { data, loading, error } = useProfileQuery({ fetchPolicy: 'network-only' });

  if (loading) {
    return (
      <div>
        <div>Profile Page</div>
        <div>Loading....</div>
      </div>
    );
  }

  if (error) {
    history.replace('/');
  }

  return (
    <div>
      <div>Profie page</div>
      <div>Email: {data?.profile?.email}</div>
    </div>
  );
};
