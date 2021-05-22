import { ApolloProvider } from '@apollo/client';
import { useAuthUser, withAuthUser } from 'next-firebase-auth';
import { FC, ReactNode } from 'react';
import { useApollo } from '../../lib/apolloClient';
import { ManagedUIContext } from '../ui/context';
import Layout from './Layout';

interface AppContextsProps {
  pageProps: any;
  children?: ReactNode;
}

const AppContexts: FC<AppContextsProps> = ({ children, pageProps }) => {
  const AuthUser = useAuthUser();
  const apolloClient = useApollo(pageProps, AuthUser.getIdToken);
  return (
    <ApolloProvider client={apolloClient}>
      <ManagedUIContext>
        <Layout>{children}</Layout>
      </ManagedUIContext>
    </ApolloProvider>
  );
};

export default withAuthUser()(AppContexts);
