import { FC } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from '../ui/Logo';
import I18nWidget from './I18nWidget';

interface Page {
  url: string;
  name: string;
}

interface Props {
  className?: string;
  children?: any;
  pages?: Page[];
}

const LEGAL_PAGES = ['terms-of-use', 'shipping-returns', 'privacy-policy'];

const Footer: FC<Props> = ({ className, pages }) => {
  const { sitePages, legalPages } = usePages(pages);
  const rootClassName = cn(className);

  return (
    <footer className={rootClassName}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-accents-2 py-12 text-primary bg-primary transition-colors duration-150">
        <div className="col-span-1 lg:col-span-2">
          <Link href="/">
            <a className="flex flex-initial items-center font-bold md:mr-24">
              <span className="rounded-full border border-gray-700 mr-2">
                <Logo />
              </span>
              <span>ACME</span>
            </a>
          </Link>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-initial flex-col md:flex-1">
            {sitePages.map((page) => (
              <li key={page.url} className="py-3 md:py-0 md:pb-4">
                <Link href={page.url}>
                  <a className="text-primary hover:text-accents-6 transition ease-in-out duration-150">
                    {page.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-initial flex-col md:flex-1">
            {legalPages.map((page) => (
              <li key={page.url} className="py-3 md:py-0 md:pb-4">
                <Link href={page.url}>
                  <a className="text-primary hover:text-accents-6 transition ease-in-out duration-150">
                    {page.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-1 lg:col-span-6 flex items-start lg:justify-end text-primary">
          <div className="flex space-x-6 items-center h-10">
            <I18nWidget />
          </div>
        </div>
      </div>
      <div className="py-12 flex flex-col md:flex-row justify-between items-center space-y-4">
        <div className="flex items-center text-primary">
          <span className="text-primary">Crafted by</span> Luis Gonzalez
        </div>
      </div>
    </footer>
  );
};

function usePages(pages?: Page[]) {
  const { locale } = useRouter();
  const sitePages: Page[] = [];
  const legalPages: Page[] = [];

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url;

      if (!slug) return;
      if (locale && !slug.startsWith(`${locale}/`)) return;

      if (isLegalPage(slug, locale)) {
        legalPages.push(page);
      } else {
        sitePages.push(page);
      }
    });
  }

  return {
    sitePages,
    legalPages,
  };
}

const isLegalPage = (slug: string, locale?: string) =>
  locale
    ? LEGAL_PAGES.some((p) => `${locale}/${p}` === slug)
    : LEGAL_PAGES.includes(slug);

export default Footer;
