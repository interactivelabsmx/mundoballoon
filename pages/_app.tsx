import 'tailwindcss/tailwind.css';

import { AppProps } from 'next/app';
import initAuth from '../lib/initAuth';
import AppContexts from '../components/common/AppContexts';

initAuth();

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    // @ts-expect-error some wired issue with passing pageProps, might be try to remove later
    <AppContexts pageProps={pageProps}>
      <Component {...pageProps} />
    </AppContexts>
  );
}
