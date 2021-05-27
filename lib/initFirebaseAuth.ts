import { init } from 'next-firebase-auth';
import firebase from 'firebase/app';

export const baseFirebaseUIAuthConfig = {
  signInFlow: 'popup',
  // Auth providers
  // https://github.com/firebase/firebaseui-web#configure-oauth-providers
  signInOptions: [
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    },
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    },
    {
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      scopes: ['public_profile'],
    },
  ],
  signInSuccessUrl: '/',
  credentialHelper: 'none',
};

const initFirebaseAuth = () => {
  init({
    authPageURL: '/auth',
    appPageURL: '/',
    loginAPIEndpoint: '/api/login', // required
    logoutAPIEndpoint: '/api/logout', // required
    // Required in most cases.
    firebaseAdminInitConfig: {
      credential: process.env.FIREBASE_PRIVATE_KEY
        ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
        : undefined,
      databaseURL: 'https://mundoballoon-dev.firebaseio.com',
    },
    firebaseClientInitConfig: {
      apiKey: 'AIzaSyDGCFoykUUvq6Ztl5EhTRL9QhuOXzl9oo0', // required
      authDomain: 'mundoballoon-dev.firebaseapp.com',
      databaseURL: 'https://mundoballoon-dev.firebaseio.com',
      projectId: 'mundoballoon-dev',
    },
    cookies: {
      name: 'mbuid', // required
      // Keys are required unless you set `signed` to `false`.
      keys: process.env.FIREBASE_COOKIES_KEYS
        ? JSON.parse(process.env.FIREBASE_COOKIES_KEYS).keys
        : undefined,
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: false, // set this to false in local (non-HTTPS) development
      signed: true,
    },
  });
};

export default initFirebaseAuth;
