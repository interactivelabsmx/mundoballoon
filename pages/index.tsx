import Head from 'next/head';
import Image from 'next/image';
import PostList from '../components/PostList';

export const Home = (): JSX.Element => (
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <Head>
      <title>Create Next App</title>
    </Head>

    <main>
      <h1 className="">
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
      <PostList />
    </main>

    <footer>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <Image src="/vercel.svg" alt="Vercel Logo" height={'32'} width={'64'} />
      </a>
    </footer>
  </div>
);

export default Home;
