import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRegisterMutation } from '../gql/generated/graphql';
import { AppStateContext } from './provider';

export const Register: React.FC = () => {
  // Navigate user to a login page after user logs in
  const history = useHistory();
  // Display any GQL Error messages
  const { gqlError } = useContext(AppStateContext);
  // Send graphql mutation to our server, hook automatically generated from Graphql script
  const [register] = useRegisterMutation();

  // Setters and Getters

  // Control the fields of the form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  // Show and hide error message
  const [show, setShow] = useState(false);

  return (
    <div>
      <div>Register Page</div>
      {show ? <div>{gqlError.msg}</div> : undefined}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            setShow(false);
            const { data } = await register({ variables: { email, password, confirmation } });
            if (data === undefined || data?.register === undefined) throw new Error('Invalid credentials');
            history.replace(`/confirm/${data?.register?.tmp_confirm_token}`);
          } catch (err) {
            setShow(true);
          }
        }}
      >
        <div>
          <input
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            value={password}
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            value={confirmation}
            placeholder="Confirm Password"
            type="password"
            onChange={(e) => {
              setConfirmation(e.target.value);
            }}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
