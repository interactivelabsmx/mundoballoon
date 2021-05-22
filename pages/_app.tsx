import 'tailwindcss/tailwind.css';

import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';

import initAuth from '../lib/initAuth';
import Layout from '../components/common/Layout';
import { ManagedUIContext } from '../components/ui/context';

initAuth();

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const apolloClient = useApollo(pageProps);

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <ManagedUIContext>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ManagedUIContext>
      </ApolloProvider>
    </>
  );
}
