import 'tailwindcss/tailwind.css';

import { AppProps } from 'next/app';
import initFirebaseAuth from '../lib/initFirebaseAuth';
import AppContexts from '../components/common/AppContexts';

initFirebaseAuth();

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    // @ts-expect-error some wired issue with passing pageProps, might be try to remove later
    <AppContexts pageProps={pageProps}>
      <Component {...pageProps} />
    </AppContexts>
  );
}
