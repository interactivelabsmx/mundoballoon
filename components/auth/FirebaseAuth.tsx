/* globals window */
import React, { useEffect, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';

import { baseFirebaseUIAuthConfig } from '../../lib/initFirebaseAuth';
import { useUI } from '../ui/context';

const CREATE_USER = gql`
  mutation CreateUser($userId: String!) {
    createUser(input: { userId: $userId }) {
      user {
        id
      }
    }
  }
`;

const FirebaseAuth = (): JSX.Element => {
  const { closeModal } = useUI();
  const [createUser, { loading, error }] = useMutation(CREATE_USER);
  const [renderAuth, setRenderAuth] = useState(false);
  const firebaseAuthConfig = {
    ...baseFirebaseUIAuthConfig,
    callbacks: {
      // https://github.com/firebase/firebaseui-web#signinsuccesswithauthresultauthresult-redirecturl
      signInSuccessWithAuthResult: (authResult) => {
        // Don't automatically redirect. We handle redirecting based on
        // auth state in withAuthComponent.js.
        createUser({ variables: { userId: authResult.user.uid } }).then(() => {
          closeModal();
        });
        return false;
      },
    },
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true);
    }
  }, []);
  return (
    <div>
      {error && <div>{error}</div>}
      {loading && <div>LOADING...</div>}
      {renderAuth ? (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : null}
    </div>
  );
};

export default FirebaseAuth;
