import React, { useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useConfirmMutation } from '../gql/generated/graphql';
import { AppStateContext } from './provider';

export const Confirm: React.FC = () => {
  const history = useHistory();
  const { appSetAuthToken, appClearAuthToken, gqlError } = useContext(AppStateContext);

  // Setters and Getters

  // Show and hide gql error message
  const [show, setShow] = useState(false);
  // Control the fields of the form
  const [email, setEmail] = useState('');
  const { token }: { token: string } = useParams();
  const [confirm] = useConfirmMutation();

  if (token === undefined || token === '') return <div>Invalid user confirmation link</div>;

  return (
    <div>
      <div>Confirmation page</div>
      {show ? <div>{gqlError.msg}</div> : undefined}

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            setShow(false);
            appSetAuthToken(token);
            const { data } = await confirm({ variables: { email } });
            appClearAuthToken();
            if (data === undefined || data?.confirm === undefined || !data.confirm) throw new Error('Not authorized');
            history.replace('/login');
          } catch (error) {
            setShow(true);
          }
        }}
      >
        <div>
          <input value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} type="text" />
        </div>
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
};
