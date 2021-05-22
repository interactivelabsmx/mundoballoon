import React from 'react';
import { withAuthUser, AuthAction } from 'next-firebase-auth';
import FirebaseAuth from './FirebaseAuth';

const SignUpView = () => (
  <div>
    <h3>Sign in</h3>
    <FirebaseAuth />
  </div>
);

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(SignUpView);
