import { FC } from 'react';
import Link from 'next/link';
import Logo from '../ui/Logo';
import UserNav from './UserNav';

const Navbar: FC = () => {
  return (
    <div>
      <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
        <div className="flex items-center flex-1">
          <Link href="/">
            <a aria-label="Logo">
              <Logo />
            </a>
          </Link>
          <nav className="hidden ml-6 space-x-4 lg:block">
            <Link href="/search">
              <a>All</a>
            </Link>
            <Link href="/search?q=clothes">
              <a>Clothes</a>
            </Link>
            <Link href="/search?q=accessories">
              <a>Accessories</a>
            </Link>
          </nav>
        </div>
        <div className="flex justify-end flex-1 space-x-8">
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
